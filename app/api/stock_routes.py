from flask import Blueprint
from flask_login import login_required
from app.models import db, Stock, User, Transaction, WatchList

stock_routes = Blueprint('stock', __name__)

@stock_routes.route('/<int:id>')
@login_required
def stock_info():
    '''
    Query for a single stock by symbol and return it in a dictionary
    '''
    stock = Stock.query.get(id)
    print("stock", stock.to_dict())
    return stock.to_dict()

    # all_stocks = Stock.query.all()
    # single_stock =
