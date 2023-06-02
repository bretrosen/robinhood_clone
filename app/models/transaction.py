from .db import db, environment, SCHEMA, add_prefix_for_prod



class Transaction(db.Model):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    stock_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stocks.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    price_purchased = db.Column(db.Float)
    price_sold = db.Column(db.Float)
    purchased = db.Column(db.Boolean, nullable=False)

    user = db.Relationship('User', back_populates='transactions')
    stock = db.Relationship('Stock', back_populates='transactions')


    def to_dict(self):
        return {
            'id': self.id,
            'stock_id': self.stock_id,
            'user_id': self.user_id,
            'quantity': self.quantity,
            'price_purchased': self.price_purchased,
            'price_sold': self.price_sold,
            'purchased': self.purchased
        }
