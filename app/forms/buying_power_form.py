from flask_wtf import FlaskForm
from wtforms import FloatField
from wtforms.validators import DataRequired, NumberRange
from app.models import User


class BuyingPowerForm(FlaskForm):
    buying_power = FloatField('buying power', validators=[DataRequired(), NumberRange(min=1, message="A minimum of 1 dollar is required")])
