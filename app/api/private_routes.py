from flask import Blueprint, request, jsonify
from flask_login import login_required
from sqlalchemy import and_, or_
from app.models import db, PrivateChannel, Message
from datetime import datetime


private_routes = Blueprint('private', __name__)

#GET ALL DM Channels, messages attached
@private_routes.route('/messages/<int:dm_id>', methods=['GET'])
@login_required
def get_dm_channels(user_id):
    ''' query for all direct message channels and return them in a list of dictionaries'''

    all_dms = PrivateChannel.query.filter(or_(PrivateChannel.user_id == user_id, PrivateChannel.user_two_id == user_id)).all()

    return [dm.to_dict() for dm in all_dms]

@private_routes.route('/<int:dm_id>', methods=['GET'])
@login_required
def get_dm_messages(dm_id):
    messages = Message.query.filter(Message.channel_id == dm_id).all()

    if messages is None:
        return jsonify({'error': 'DM not found'}), 404

    return [message.to_dict_dm() for message in messages]
