from .db import db, environment, SCHEMA, add_prefix_for_prod


class WatchListItem(db.Model):
    __tablename__ = 'watch_list_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    watch_list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('watch_lists.id')), nullable = False)
    stock_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stocks.id')), nullable=False)

    stock = db.Relationship('Stock', back_populates='watch_list_items')
    watch_list = db.Relationship('WatchList', back_populates='watch_list_items')


    def to_dict(self):
        return {
            'id': self.id,
            'stock_id': self.stock_id,
            'watch_list_id': self.watch_list_id,
        }
