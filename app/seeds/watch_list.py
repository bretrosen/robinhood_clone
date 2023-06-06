from app.models import db, WatchList, environment, SCHEMA
from random import choice, sample, randint
from faker import Faker
from sqlalchemy.sql import text

fake = Faker()

def seed_watch_lists(all_stocks):
    wl_one = WatchList(
        name = "Demo's master stock list",
        user_id = 1,
        stocks = sample(all_stocks, randint(0, len(all_stocks))),
    )
    wl_two = WatchList(
        name = "Demo's bad stock list",
        user_id = 1,
        stocks = sample(all_stocks, randint(0, len(all_stocks))),
    )
    wl_three = WatchList(
        name = "Demo's hopeful stock list",
        user_id = 1,
        stocks = sample(all_stocks, randint(0, len(all_stocks))),
    )
    wl_four = WatchList(
        name = "Marnie's stock list",
        user_id = 2,
        stocks = sample(all_stocks, randint(0, len(all_stocks))),
    )
    wl_five = WatchList(
        name = "Bobbie's stock list",
        user_id = 3,
        stocks = sample(all_stocks, randint(0, len(all_stocks))),
    )
    wl_six = WatchList(
        name = "Bobbie's stock wishlist",
        user_id = 3,
        stocks = sample(all_stocks, randint(0, len(all_stocks))),
    )

    wl_all = [wl_one, wl_two, wl_three, wl_four, wl_five, wl_six]

    wl_add = [db.session.add(wl) for wl in wl_all]
    db.session.commit()


def undo_watch_list():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watch_lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watch_lists"))

    db.session.commit()
