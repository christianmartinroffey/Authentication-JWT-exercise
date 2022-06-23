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
    if email != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

    @api.route("/hello", methods=["GET"])
    @jwt_required()
    def get_hello():
   
        dictionary = { 
       "message": "hello world"
    }
    return jsonify(dictionary)

# needs a new endpoint to create a user using post /signup
# generate access token

    @api.route("/signup", methods=["POST"])
    @jwt_required()
    def createNewUser():
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        return jsonify({"msg": "error signing up"}), 401
        
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token)
   