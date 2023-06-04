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

    # user_stocks = []
    # user_transactions = []
    # user_watchlists = []

    user = User.query.get(id)

    user_data = user.to_dict()
    user_data["transactions"] = []
    user_data["watch_lists"] = []

    transactions = Transaction.query.filter(Transaction.user_id == id).all()
    watch_lists = WatchList.query.filter(WatchList.user_id == id).all()
    # watch_lists = db.session.query(WatchList, Stock).join(Stock).all()

    # wl_items = WatchList.query.join(Stock).filter()

    print('how many lists does user 1 have', len(watch_lists))

    for watch_list in watch_lists:
        wl_stocks = watch_list
        # wl = watch_list.to_dict()
        print('is this grabbing the stocks?', watch_list['id'])

        # user_data["watch_lists"].append(wl)
        # watch_list_res = watch_list.to_dict()
        # watch_list_res["watch_list_items"] = []

        # watch_list_items = WatchListItem.query.filter(WatchListItem.watch_list_id == watch_list_res["id"]).all()
        # for watch_list_item in watch_list_items:
        #     watch_list_res["watch_list_items"].append(watch_list_item.to_dict())


        # user_data['watch_lists'].append(watch_list_res)


    # for transaction in transactions:
    #     user_data["transactions"].append(transaction.to_dict())





    return user_data
