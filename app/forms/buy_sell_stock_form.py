from flask_login import current_user
from flask_wtf import FlaskForm
from wtforms import FloatField
from wtforms.validators import DataRequired, NumberRange, ValidationError
from app.models import Transaction

def buying_power_check(form, field):
    # Checks if user has enough buying power
    if form.price_purchased.data == None:
        pass
    else:
        price_purchased = form.price_purchased.data
        quantity = form.quantity.data

        if current_user.buying_power <  (price_purchased * quantity):
            raise ValidationError('You do not have enough buying power for this transaction, please add funds.')


def selling_stock_check(form, field):
    # Checks if user has stock quantity to sell

    if form.price_sold.data == None:
        pass
    else:
        quantity = form.quantity.data
        user_transactions = Transaction.query.filter(Transaction.user_id == current_user.id, Transaction.stock_id == form.stock_id).all()
        total_quantity_bought = 0
        total_quantity_sold = 0

        for transaction in user_transactions:

            if transaction.purchased == True:
                total_quantity_bought = total_quantity_bought + transaction.quantity
            else:
                total_quantity_sold = total_quantity_sold + transaction.quantity

        if total_quantity_bought - total_quantity_sold < quantity:
            raise ValidationError(f'You do not have enough stock quantity for this transaction, you current quantity of stock is {total_quantity_bought - total_quantity_sold}.')


class BuySellStockForm(FlaskForm):
    quantity = FloatField('quantity', validators=[DataRequired(), NumberRange(min=.1, message="A minimum of .1 shares of stock is required")])
    price_purchased = FloatField('price purchased', validators=[buying_power_check])
    price_sold = FloatField('price purchased', validators=[selling_stock_check])
