from app.models import db, WatchListItem, environment, SCHEMA
from faker import Faker
from sqlalchemy.sql import text

fake = Faker()

def generate_list_items():
    list_items = []
    for watch_list_id in range (1, 7): # Generating data for watchlists 1-6
        for _ in range (round (fake.random.uniform(1, 13))): # Generates a random number of stocks for each watchlist
            stock_id = round (fake.random.uniform(1, 20)) # Generates a random stock id for each item in the watch list

            entry = {
                'watch_list_id': watch_list_id,
                'stock_id': stock_id
            }
            list_items.append(WatchListItem(**entry))
    return list_items




def seed_watch_list_items():
    watch_items_list = generate_list_items()
    for item in watch_items_list:
       value = item.to_dict()
       db.session.add(WatchListItem(
           watch_list_id = value["watch_list_id"],
           stock_id = value["stock_id"]
       ))
    db.session.commit()


def undo_watch_list_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watch_list_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watch_list_items"))

    db.session.commit()
