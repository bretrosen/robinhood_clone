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
