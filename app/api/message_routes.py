from flask import Blueprint, request, jsonify
from app.models import db, Message
from app.forms import MessageForm
from datetime import datetime


message_routes = Blueprint('messages', __name__)


# GET /messages --> get all messages
@message_routes.route("")
def get_messages():
    all_messages = Message.query.all()
    return [message.to_dict() for message in all_messages]


# GET /messages/:id --> get message by id
@message_routes.route("/<int:id>")
def get_message_id(id):
    message = Message.query.get(id)
    if message:
        return message.to_dict()
    return jsonify({"error": "Message not found"}), 404


# POST /messages --> create a message
@message_routes.route("", methods=["POST"])
def create_message():
    res = request.get_json()

    form = MessageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    errors = {}

    # !!!!!!!!!! for testing, it's been lowered to 5, return to 5 before deploying
    # COMMENT CHANNEL ID BACK IN ONCE CHANNEL MODEL IS MADE
    if len(res["content"]) > 5:
            errors.content = "Messages must be less than 2000 characters"
            return jsonify({"errors": errors}), 400

    if form.validate_on_submit():
        new_message = Message(
            content=res["content"],
            user_id=res["userId"],
            # channel_id=["channelId"],
            timestamp =["timestamp"]
        )

        db.session.add(new_message)
        db.session.commit()
        return new_message.to_dict()
    return jsonify({"errors": form.errors}), 400


# PUT /messages/:id --> update a message by id
@message_routes.route("/<int:id>", methods=["PUT"])
def update_message(id):
    message = Message.query.get(id)
    res = request.get_json()

    if message:
        message.content = res["content"] or message.content
        message.timestamp = datetime.utcnow

        db.session.commit()
        return message.to_dict()
    return jsonify({"error": "Message not found"}), 404
