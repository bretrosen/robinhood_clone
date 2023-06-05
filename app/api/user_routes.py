from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Transaction, WatchList, Stock
from app.forms.buying_power_form import BuyingPowerForm


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

    user = current_user

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


@user_routes.route('/<int:id>/buying_power_add', methods=['POST'])
@login_required
def update_buying_power(id):
    """
    Query for current user's buying power and updating with incoming value
    """

    user = current_user
    form = BuyingPowerForm()

    form['csrf_token'].data = request.cookies['csrf_token'] # Boilerplate code
    if form.validate_on_submit():
        user.buying_power = form.data['buying_power'] + user.buying_power
        db.session.commit()

        return user.to_dict()
    else:
        return form.errors
