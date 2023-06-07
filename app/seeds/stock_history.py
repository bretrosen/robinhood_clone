from faker import Faker
from datetime import datetime, timedelta
from random import choice, uniform, gauss
from app.models import db, StockHistory, environment, SCHEMA
from sqlalchemy.sql import text

ASCENDING = [1, 1, -1, 1, 1, -1]
DESCENDING = [-1, -1, 1, -1, -1, 1]
TREND = [ASCENDING, DESCENDING]

def generate_price_history():
    price_history = []

    for stock_id in range(1, 22):  # Generate data for stock_id 1 to 21
        mu = 150  # Mean of 150
        sigma = 100  # Standard deviation of 100
        price = round(gauss(mu, sigma), 2) # Start with a normally distributed random price
        progression = choice(TREND)  # Each stock will trend upward or downward
        for num in range(100):  # Generate 100 price history entries per stock_id
            price += round(choice(progression) * uniform(-5, 5), 2)  # Generate a random price change from the overall trend
            today = datetime.now()
            d = timedelta(days = num)
            time_stamp = today - d  # Generate timestamps for the last 100 days
            entry = {
                'stock_id': stock_id,
                'price': abs(price),  # Ensure the stock price is positive
                'time_stamp': time_stamp
            }
            price_history.append(StockHistory(**entry))
    return price_history

def seed_stock_history():
    history_list = generate_price_history()
    for history in history_list:
        value = history.to_dict()
        db.session.add(StockHistory( stock_id = value["stock_id"],
                       price = value["price"],
                       time_stamp = value['time_stamp']
        ))
    # [db.session.add(**price.to_dict) for price in history_list]
    db.session.commit()


def undo_stock_history():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stock_historys RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stock_historys"))

    db.session.commit()
