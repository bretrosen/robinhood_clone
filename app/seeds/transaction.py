from app.models import db, Transaction, environment, SCHEMA
from sqlalchemy.sql import text

def seed_transaction():
    transaction1 = Transaction(stock_id=1,
                               user_id=1,
                                quantity=1,
                                price_purchased=92.99,
                                price_sold=0,
                                purchased=True)
    transaction2 = Transaction(stock_id=2,
                               user_id=2,
                                quantity=0.5,
                                price_purchased=0,
                                price_sold=45.23,
                                purchased=False)
    transaction3 = Transaction(stock_id=3,
                               user_id=3,
                                quantity=4,
                                price_purchased=33.22,
                                price_sold=0,
                                purchased=True)
    transaction4 = Transaction(stock_id=4,
                               user_id=1,
                                quantity=0.1,
                                price_purchased=229.45,
                                price_sold=0,
                                purchased=True)

    db.session.add(transaction1)
    db.session.add(transaction2)
    db.session.add(transaction3)
    db.session.add(transaction4)
    db.session.commit()

    # Need to figure out how to connect transactions with buying_power on seeding
    # Wait until after seeds are done and then use a function that connects transactions and buying_power


def undo_transaction():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transactions"))

    db.session.commit()
