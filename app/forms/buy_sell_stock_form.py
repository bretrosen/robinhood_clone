from flask_login import current_user
from flask_wtf import FlaskForm
from wtforms import FloatField
from wtforms.validators import DataRequired, NumberRange, ValidationError

def buying_power_check(form, field):
    # Checks if user has enough buying power
    price_purchased = form.price_purchased.data
    quantity = form.quantity.data

    if current_user.buying_power <  (price_purchased * quantity):
        raise ValidationError('You do not have enough buying power for this transaction, please add funds.')


def selling_stock_check(form, field):
    # Checks if user has stock quantity to sell
    quantity = form.quantity.data



class BuySellStockForm(FlaskForm):
    quantity = FloatField('quantity', validators=[DataRequired(), NumberRange(min=.1, message="A minimum of .1 shares of stock is required")])
    price_purchased = FloatField('price purchased', validators=[buying_power_check])
    price_sold = FloatField('price purchased')
