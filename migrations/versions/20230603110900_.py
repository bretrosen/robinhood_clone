"""empty message

Revision ID: 6c491941a676
Revises: 
Create Date: 2023-06-03 11:09:00.443350

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6c491941a676'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('stock_historys',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('stock_id', sa.Integer(), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('time_stamp', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['stock_id'], ['stocks.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('stocks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('symbol', sa.String(length=10), nullable=False),
    sa.Column('stock_history_id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('market_cap', sa.Float(), nullable=False),
    sa.Column('pe_ratio', sa.Float(), nullable=False),
    sa.Column('dividend', sa.Float(), nullable=True),
    sa.Column('stock_ceo', sa.String(length=40), nullable=True),
    sa.Column('employees', sa.Integer(), nullable=True),
    sa.Column('headquarters', sa.String(), nullable=True),
    sa.Column('year_founded', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['stock_history_id'], ['stock_historys.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('first_name', sa.String(length=20), nullable=False),
    sa.Column('last_name', sa.String(length=20), nullable=False),
    sa.Column('buying_power', sa.Float(), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('transactions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('stock_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Float(), nullable=False),
    sa.Column('price_purchased', sa.Float(), nullable=True),
    sa.Column('price_sold', sa.Float(), nullable=True),
    sa.Column('purchased', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['stock_id'], ['stocks.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('watch_lists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('watch_list_items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('watch_list_id', sa.Integer(), nullable=False),
    sa.Column('stock_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['stock_id'], ['stocks.id'], ),
    sa.ForeignKeyConstraint(['watch_list_id'], ['watch_lists.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('watch_list_items')
    op.drop_table('watch_lists')
    op.drop_table('transactions')
    op.drop_table('users')
    op.drop_table('stocks')
    op.drop_table('stock_historys')
    # ### end Alembic commands ###