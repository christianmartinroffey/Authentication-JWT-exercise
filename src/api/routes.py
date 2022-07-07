"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from sqlalchemy.exc import SQLAlchemyError
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
# this is to generate a hash password
from werkzeug.security import check_password_hash, generate_password_hash

api = Blueprint('api', __name__)

# protect page end point
@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():
   # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user, message="this is from the backend"), 200

if __name__ == "__main__":
    app.run()

# /signup end point below
# generate access token
@api.route("/signup", methods=["POST"])
def createNewUser():
    request_body = request.get_json(force=True)
    email = request_body['email']
    password = request_body['password']
    hash_password = generate_password_hash(password)
    is_active = True

    try:
        newUser = User(email=email, password=hash_password, is_active=is_active)
    except SQLAlchemyError: 
        return jsonify("error creating the user"), 400
    try:
        db.session.add(newUser)
    except SQLAlchemyError: 
        return jsonify("error adding the user"), 400
    db.session.commit()

    access_token = create_access_token(identity=email)
    return jsonify({"msg": "sign up complete", "access_token" : access_token}), 201

    # except SQLAlchemyError: 
    #     return jsonify({"msg": "user already exists"}), 400
        
    #     pass

    return jsonify({"msg": "error signing up"}), 401

@api.route("/token", methods=["POST"])
def create_token():
    request_body = request.get_json(force=True)
    email = request_body['email']
    password = request_body['password']

    user = User.query.filter_by(email=email).first()

    if user == None:
        return jsonify({"msg": "user does not exist"}), 404
    else:
        # if this passes all good - get the token
        hash_password = generate_password_hash(password)
        if hash_password == user.password:
            access_token = create_access_token(identity=email)
            return jsonify(access_token=access_token)
        else:
            return jsonify({"msg": "wrong password"}), 400