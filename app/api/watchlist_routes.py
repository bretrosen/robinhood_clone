from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, WatchList, Stock
from app.forms.create_watchlist_form import WatchlistFormCreate


watchlist_routes = Blueprint('watchlists', __name__)

@watchlist_routes.route("", methods = ["POST"])
def create_watchlist():
    form = WatchlistFormCreate()
    user = current_user
    form['csrf_token'].data = request.cookies['csrf_token'] # Boilerplate code
    print('we hit the post wathclist route')
    if form.validate_on_submit():
        new_watchlist = WatchList(
            name = form.data["name"],
            user_id = user.id
        )
        db.session.add(new_watchlist)
        db.session.commit()
        print('added new watchlist')
        return new_watchlist.to_dict()

    if form.errors:
        print(form.errors)
        return form.errors, 400

@watchlist_routes.route("<int:watchlistId>", methods = ["DELETE", "PUT"])
def delete_watchlist(watchlistId):
    if request.method == "PUT":
        list_to_update = WatchList.query.get(watchlistId)
        data = request.get_json()
        print("this is the method ===============>        ", data)
        list_to_update.name = data['name']
        db.session.commit()
        return list_to_update.to_dict()



    list_to_delete = WatchList.query.get(watchlistId)
    # print("this is the watchlist that will be deleted ===============>", list_to_delete)
    db.session.delete(list_to_delete)
    db.session.commit()
    return list_to_delete.to_dict()

@watchlist_routes.route("list/<int:watchlistId>", methods = ["POST", "DELETE"])
def add_stock_to_list(watchlistId):
    data = request.get_json()
    stockId = int(data['stock'])
    stock = Stock.query.get(stockId)
    list = WatchList.query.get(watchlistId)

    if request.method == "DELETE":
        # all_stocks = [stock.to_dict() for stock in list.stocks]
        # print("all stocks  ==========>  ", all_stocks)
        list.stocks = [stock for stock in list.stocks if stock.to_dict()["id"] != stockId]
        db.session.commit()

        return list.to_dict()

    # print("this is the stockid ===============>   ", stockId)
    list.stocks.append(stock)
    db.session.commit()
    # print("this is the stocks ===============>   ", list.stocks)
    return list.to_dict()
