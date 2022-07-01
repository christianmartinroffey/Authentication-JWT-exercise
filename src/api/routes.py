"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
   

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

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
        id = request.json.get(id, None)
        email = request.json.get(email, None)
        password = request.json.get(password, None)
        
        return jsonify({"msg": "error signing up"}), 401
        
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token)
   