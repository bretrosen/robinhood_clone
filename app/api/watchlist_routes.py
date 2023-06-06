from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, WatchList
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

@watchlist_routes.route("")
