from sqlalchemy.sql import text
from app.models import db, Transaction, environment, SCHEMA
from random import randint, choice
from faker import Faker

fake = Faker()

# Used to make sure all users have positive stock quantity, numbers represent seed users
quantity_tracker = {
    1: {},
    2: {},
    3: {},
}


def generate_transactions():
    transactions = []
    # Want transaction data for all stocks
    for stock_id in range(1, 37):
        # Seed 20 transactions per stock
        for _ in range(3):
            # Randomly choose a user for a transaction
            user_id = randint(1, 3)
            # Generate a random timestamp within the last year
            time_stamp = fake.date_time_between(start_date='-1y', end_date='now')
            # Randomly choose a quantity between 1 and 10
            quantity = fake.random.uniform(1, 10)
            # Randomly choose a buy or sell for transaction
            purchased = choice([True, False])
            if purchased:
                price_purchased = fake.random.uniform(1, 100)
                price_sold = 0
            else:
                price_sold = fake.random.uniform(1, 100)
                price_purchased = 0
            new_transaction = {
                'stock_id': stock_id,
                'user_id': user_id,
                'time_stamp': time_stamp,
                'quantity': quantity,
                'purchased': purchased,
                'price_purchased': price_purchased,
                'price_sold': price_sold
            }


            # Adds initial stock to users dictionary if they have none
            if len(quantity_tracker[new_transaction['user_id']].items()) == 0:
                if new_transaction['purchased']:
                    quantity_tracker[new_transaction['user_id']][new_transaction['stock_id']] = new_transaction['quantity']
                else:
                    new_transaction['purchased'] = True
                    new_transaction['price_purchased'] = new_transaction['price_sold']
                    new_transaction['price_sold'] = 0
                    quantity_tracker[new_transaction['user_id']][new_transaction['stock_id']] = new_transaction['quantity']

            # Once users in quantity checker all have at least one stock for loop iterates through all their stocks
            else:
                for stock, quantity_check in quantity_tracker[new_transaction['user_id']].items():

                    # Checks if user has generated stock
                    if stock == new_transaction['stock_id']:
                        quantity_tracker_stock_id = quantity_tracker[new_transaction['user_id']][new_transaction['stock_id']]
                        # If stock is purchased, adds quantity to total quantity
                        if new_transaction['purchased']:
                            quantity_tracker[new_transaction['user_id']][new_transaction['stock_id']] = new_transaction['quantity'] + quantity_tracker[new_transaction['user_id']][new_transaction['stock_id']]
                        # If stock is sold...
                        else:
                            # Sells stock and lowers quantity if user has enough quantity in tracker
                            if quantity_tracker[new_transaction['user_id']][new_transaction['stock_id']] > new_transaction['quantity']:
                                quantity_tracker[new_transaction['user_id']][new_transaction['stock_id']] = quantity_tracker[new_transaction['user_id']][new_transaction['stock_id']] - new_transaction['quantity']
                            # Changes generated transaction to a buy and adds stock if user doesn't have enough quantity to sell
                            else:
                                new_transaction['purchased'] = True
                                new_transaction['price_purchased'] = new_transaction['price_sold']
                                new_transaction['price_sold'] = 0
                                quantity_tracker[new_transaction['user_id']][new_transaction['stock_id']] = new_transaction['quantity']
                    # Adds stock to user's dictionary if they don't have stock already
                    elif new_transaction['purchased']:
                        quantity_tracker[new_transaction['user_id']][new_transaction['stock_id']] = new_transaction['quantity']
                        break


            transactions.append(Transaction(**new_transaction))

    print('=======================> this is the quantity tracker', quantity_tracker)
    return transactions


def seed_transaction():
    transaction_list = generate_transactions()
    for transaction in transaction_list:
        value = transaction.to_dict()




        db.session.add(Transaction( stock_id = value['stock_id'],
                                   user_id = value['user_id'],
                                   quantity = value['quantity'],
                                   time_stamp = value['time_stamp'],
                                   purchased = value['purchased'],
                                   price_purchased = value['price_purchased'],
                                   price_sold = value['price_sold']
        ))
    db.session.commit()

    # Need to figure out how to connect transactions with buying_power on seeding
    # Wait until after seeds are done and then use a function that connects transactions and buying_power?


def undo_transaction():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transactions"))

    db.session.commit()
