from .db import db, environment, SCHEMA, add_prefix_for_prod
from .watch_list_item import items


class Stock(db.Model):
    __tablename__ = 'stocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    symbol = db.Column(db.String(10), nullable=False)
    description = db.Column(db.String)
    market_cap = db.Column(db.Float, nullable=False)
    pe_ratio = db.Column(db.Float, nullable=False)
    dividend = db.Column(db.Float)
    stock_ceo = db.Column(db.String(40))
    employees = db.Column(db.Integer)
    headquarters = db.Column(db.String)
    year_founded = db.Column(db.Integer)

    stock_history = db.relationship('StockHistory', back_populates='stock')
    transactions = db.relationship('Transaction', back_populates='stock')

    # watch_list_items = db.relationship('WatchListItem', back_populates='stock')

    watch_list_items = db.relationship(
        "WatchList",
        secondary=items,
        back_populates="stocks"
    )


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'symbol': self.symbol,
            'description': self.description,
            'market_cap': self.market_cap,
            'pe_ratio': self.pe_ratio,
            'dividend': self.dividend,
            'stock_ceo': self.stock_ceo,
            'employees': self.employees,
            'headquarters': self.headquarters,
            'year_founded': self.year_founded,
        }
