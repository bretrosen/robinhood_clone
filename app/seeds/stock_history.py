# from faker import Faker
# from datetime import datetime
# from random import randint
# from app.models import db, StockHistory, environment, SCHEMA
# from sqlalchemy.sql import text

# fake = Faker()

# def generate_price_history():
#     price_history = []
#     for stock_id in range(1, 21):  # Generate data for stock_id 1 to 20
#         for _ in range(100):  # Generate 100 price history entries per stock_id
#             price = round(fake.random.uniform(1, 100), 2)  # Generate a random price between 1 and 100
#             time_stamp = fake.date_time_between(start_date='-1y', end_date='now')  # Generate a random timestamp within the past year
#             entry = {
#                 'stock_id': stock_id,
#                 'price': price,
#                 'time_stamp': time_stamp
#             }
#             price_history.append(entry)
#     return price_history

# def seed_stock_history():
#     [db.session.add(**price) for price in generate_price_history()]
#     db.session.commit()


# def undo_users():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM stock_historys"))

#     db.session.commit()
