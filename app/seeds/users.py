from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():


    users = [
    User(
        username='Demo#1234', email='demo@aa.io', password='password', prof_pic='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYo3lDG3i6el9FFjM6LLw3d2kqJYFa0_4pHw&usqp=CAU'), #1
    User(
        username='Marnie#2345', email='marnie@aa.io', password='password', prof_pic='https://static.vecteezy.com/system/resources/previews/002/082/524/original/cute-shiba-inu-dog-with-sunglasses-crossing-arms-cartoon-illustration-vector.jpg'), #2
    User(
        username='Bobbie#2121', email='bobbie@aa.io', password='password', prof_pic='https://ih1.redbubble.net/image.2279664396.6679/st,small,507x507-pad,600x600,f8f8f8.jpg'), #3
    User(
        username='rlang#7070', email='raylang@gmail.com', password='password1', prof_pic='https://preview.redd.it/sed7j1wryt741.jpg?auto=webp&s=efccc659f3693ade42f6b247934cb4fdfc41edd7'), #4
    User(
        username='zaddy#0206', email='zaddy@gmail.com', password='password2', prof_pic='https://i.redd.it/6jupfeilyhx71.jpg'),#5
    User(
        username='ryo#0001', email='ryanmester@gmail.com', password='password3', prof_pic='https://ih1.redbubble.net/image.1580724210.1236/st,small,507x507-pad,600x600,f8f8f8.jpg'), #6
    User(
        username='rtan#0001', email='rytan@gmail.com', password='password4', prof_pic='https://ih1.redbubble.net/image.1580724210.1236/st,small,507x507-pad,600x600,f8f8f8.jpg'), #7
    ]

    db.session.add_all(users)
    # db.session.execute(text("ALTER SEQUENCE users_id_seq RESTART WITH 1"))
    db.session.commit()

    return users


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DROP TABLE if exists users cascade"))

    db.session.commit()
