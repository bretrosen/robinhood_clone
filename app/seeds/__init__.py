from flask.cli import AppGroup
from .users import seed_users, undo_users
from .stock_history import seed_stock_history, undo_stock_history
from .transaction import seed_transaction, undo_transaction
from .watch_list import seed_watch_lists, undo_watch_list
from .watch_list_item import seed_watch_list_items, undo_watch_list_items
from app.models.db import db, environment, SCHEMA
from .stocks import seed_stocks, undo_stocks
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
    seed_users()
    seed_transaction()
    # seed_watch_list_items()
    # all_stocks = seed_stocks()
    # seed_stock_history()
    # seed_watch_lists(all_stocks)
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # undo_stock_history()
    # undo_stocks()
    undo_transaction()
    undo_users()
    # undo_watch_list()
    # Add other undo functions here
