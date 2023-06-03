from sqlalchemy.sql import text
from app.models import db, Transaction, environment, SCHEMA
from random import randint, choice
from faker import Faker

fake = Faker()

def generate_transactions():
    transactions = []
    # Want transaction data for all stocks
    for stock_id in range(1, 21):
        # Seed 20 transactions per stock
        for _ in range(20):
            # Randomly choose a user for a transaction
            user_id = randint(1, 3)
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
                'quantity': quantity,
                'purchased': purchased,
                'price_purchased': price_purchased,
                'price_sold': price_sold
            }
            transactions.append(Transaction(**new_transaction))
    return transactions


def seed_transaction():
    transaction_list = generate_transactions()
    for transaction in transaction_list:
        value = transaction.to_dict()
        db.session.add(Transaction( stock_id = value['stock_id'],
                                   user_id = value['user_id'],
                                   quantity = value['quantity'],
                                   purchased = value['purchased'],
                                   price_purchased = value['price_purchased'],
                                   price_sold = value['price_sold']
        ))
    db.session.commit()

    # transaction1 = Transaction(stock_id=1,
    #                            user_id=1,
    #                             quantity=1,
    #                             price_purchased=92.99,
    #                             price_sold=0,
    #                             purchased=True)
    # transaction2 = Transaction(stock_id=2,
    #                            user_id=2,
    #                             quantity=0.5,
    #                             price_purchased=0,
    #                             price_sold=45.23,
    #                             purchased=False)
    # transaction3 = Transaction(stock_id=3,
    #                            user_id=3,
    #                             quantity=4,
    #                             price_purchased=33.22,
    #                             price_sold=0,
    #                             purchased=True)
    # transaction4 = Transaction(stock_id=4,
    #                            user_id=1,
    #                             quantity=0.1,
    #                             price_purchased=229.45,
    #                             price_sold=0,
    #                             purchased=True)

    # db.session.add(transaction1)
    # db.session.add(transaction2)
    # db.session.add(transaction3)
    # db.session.add(transaction4)
    # db.session.commit()

    # Need to figure out how to connect transactions with buying_power on seeding
    # Wait until after seeds are done and then use a function that connects transactions and buying_power


def undo_transaction():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transactions"))

    db.session.commit()
