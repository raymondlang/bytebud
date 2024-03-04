"""update tables

Revision ID: 670fc11ed7cc
Revises: 102462bd2a5f
Create Date: 2024-03-03 14:47:59.691092

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '670fc11ed7cc'
down_revision = '102462bd2a5f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('private_channels',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('user_two_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_two_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('requests',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('sender_id', sa.Integer(), nullable=False),
    sa.Column('receiver_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['receiver_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['sender_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('channels', schema=None) as batch_op:
        batch_op.drop_column('description')

    with op.batch_alter_table('messages', schema=None) as batch_op:
        batch_op.add_column(sa.Column('private_id', sa.Integer(), nullable=True))
        batch_op.alter_column('channel_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.create_foreign_key(None, 'private_channels', ['private_id'], ['id'])

    with op.batch_alter_table('server', schema=None) as batch_op:
        batch_op.alter_column('server_picture',
               existing_type=sa.VARCHAR(length=120),
               type_=sa.String(length=500),
               existing_nullable=True)
        batch_op.drop_column('description')

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('prof_pic', sa.String(length=500), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('prof_pic')

    with op.batch_alter_table('server', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.VARCHAR(length=120), autoincrement=False, nullable=True))
        batch_op.alter_column('server_picture',
               existing_type=sa.String(length=500),
               type_=sa.VARCHAR(length=120),
               existing_nullable=True)

    with op.batch_alter_table('messages', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.alter_column('channel_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.drop_column('private_id')

    with op.batch_alter_table('channels', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.VARCHAR(length=120), autoincrement=False, nullable=True))

    op.drop_table('requests')
    op.drop_table('private_channels')
    # ### end Alembic commands ###