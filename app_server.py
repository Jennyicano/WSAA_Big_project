# Boardgames Web Application - Flask Server
# This file sets up a Flask server to handle REST API requests for board games.
# It connects to a MySQL database using the boardgamesDAO class for data operations.
# Author: Jenny Ibanez Cano

from flask import Flask, request, jsonify, render_template
import mysql.connector
import dbconfig as db
from boardgamesDAO import boardgamesDAO

app = Flask(__name__, static_url_path='', static_folder='static')

# REST API Routes
@app.route('/')
def index():
    return render_template('index.html')

#curl "http://127.0.0.1:5000/boardgames"
@app.route('/boardgames', methods=['GET'])
def getAll():
    items = boardgamesDAO.getAll()
    return jsonify(items)

@app.route('/boardgames', methods=['POST'])
def add_item():
    data = request.json
    item = boardgamesDAO.create(data)
    return jsonify(item), 201

@app.route('/boardgames/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    data = request.json
    boardgamesDAO.update(item_id, data)
    return jsonify({'id': item_id, **data})

@app.route('/boardgames/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    boardgamesDAO.delete(item_id)
    return jsonify({'message': 'boardgame deleted'})

# Web UI Route

if __name__ == '__main__':
    app.run(debug=True)
    