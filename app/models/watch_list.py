from .db import db, environment, SCHEMA, add_prefix_for_prod
from .watch_list_item import items


class WatchList(db.Model):
    __tablename__ = 'watch_lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)

    # watch_list_items = db.relationship('WatchListItem', back_populates='watch_list')

    stocks = db.relationship(
        "Stock",
        secondary=items,
        back_populates="watch_list_items"
    )

    user = db.relationship('User', back_populates='watch_lists')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
        }
