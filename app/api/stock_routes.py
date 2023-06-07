from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Transaction, WatchList, Stock, StockHistory
from app.forms.buy_sell_stock_form import BuySellStockForm
from sqlalchemy import desc


stock_routes = Blueprint('stocks', __name__)


@stock_routes.route('/<int:id>')
@login_required
def stock_info(id):
    '''
    Query for a single stock by symbol and return it in a dictionary
    '''
    stock = Stock.query.get(id)
    stock_data = stock.to_dict()
    stock_data['stock_history'] = []

    history = StockHistory.query.filter(StockHistory.stock_id == id).order_by(desc(StockHistory.time_stamp))

    for item in history:
        stock_data['stock_history'].append(item.to_dict())

    return stock_data


@stock_routes.route('/')
@login_required
def all_stocks():
    '''
    Query for all stocks to populate suggested search
    '''

    all_stocks = Stock.query.all()
    return {'stocks': [stock.to_dict() for stock in all_stocks]}


@stock_routes.route('/all_history')
def all_stock_history():
    '''
    Query for all stock history
    '''

    all_history = StockHistory.query.all()
    return {'history': [item.to_dict() for item in all_history]}


@stock_routes.route('/<int:id>/buy_stock', methods=['POST'])
@login_required
def buy_stock(id):
    """
    Query for current user, add a transaction and update buying power
    """

    user = current_user
    form = BuySellStockForm()

    form['csrf_token'].data = request.cookies['csrf_token'] # Boilerplate code

    if form.validate_on_submit():
        new_transaction = Transaction(
            stock_id=id,
            user_id=user.id,
            quantity=form.data['quantity'],
            price_purchased=form.data['price_purchased'],
            price_sold=None,
            purchased=True,
            time_stamp=datetime.now()
        )

        db.session.add(new_transaction) # Add new transaction to DB
        user.buying_power = user.buying_power - (form.data['price_purchased'] * form.data['quantity'])# Update user buying power

        db.session.commit()
        return new_transaction.to_dict()

    else:
        return form.errors


@stock_routes.route('/<int:id>/sell_stock', methods=['POST'])
@login_required
def sell_stock(id):
    """
    Query for current user, add a transaction and update buying power
    """

    user = current_user
    form = BuySellStockForm()

    form['csrf_token'].data = request.cookies['csrf_token'] # Boilerplate code
    form.stock_id = id

    if form.validate_on_submit():
        new_transaction = Transaction(
            stock_id=id,
            user_id=user.id,
            quantity=form.data['quantity'],
            price_purchased=None,
            price_sold=form.data['price_sold'],
            purchased=False,
            time_stamp=datetime.now()
        )

        db.session.add(new_transaction) # Add new transaction to DB
        user.buying_power = user.buying_power + (form.data['price_sold'] * form.data['quantity'])# Update user buying power

        db.session.commit()
        return new_transaction.to_dict()

    else:
        return form.errors
