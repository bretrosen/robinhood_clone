from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, User, Transaction, WatchList, Stock

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/portfolio') # Might need to change the route?
@login_required
def portfolio(id):
    """
    Query for all of current user's stock and watchlist information
    """

    user = User.query.get(id)

    user_data = user.to_dict()
    user_data["transactions"] = []
    user_data["watch_lists"] = []

    transactions = Transaction.query.filter(Transaction.user_id == id).all()
    watch_lists = WatchList.query.filter(WatchList.user_id == id).all()


    for watch_list in watch_lists:
        wl = watch_list.to_dict()
        wl["stocks"] = []
        stocks = watch_list.stocks  # This is grabbing stocks from watch_list_items join table

        for stock in stocks:
            wl["stocks"].append(stock.to_dict())

        user_data["watch_lists"].append(wl)


    for transaction in transactions:
        user_data["transactions"].append(transaction.to_dict())

    return user_data
