from .db import db, environment, SCHEMA, add_prefix_for_prod


class StockHistory(db.Model):
    __tablename__ = 'stock_historys'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    stock_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stocks.id')), nullable=False)
    price = db.Column(db.Float, nullable=False)
    time_stamp = db.Column(db.DateTime, nullable=False)

    stock = db.relationship('Stock', back_populates='stock_history')

    def to_dict(self):
        return {
            'id': self.id,
            'stock_id': self.stock_id,
            'price': self.price,
            'time_stamp': self.time_stamp,
        }
