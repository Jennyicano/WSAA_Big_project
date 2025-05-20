from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import mysql.connector
import dbconfig as db  
from boardgamesDAO import boardgamesDAO

app = Flask(__name__)
CORS(app) # Enable CORS for all routes
app.config['CORS_HEADERS'] = 'Content-Type'

app = Flask(__name__, static_url_path='', static_folder='static')
 
# REST API Routes
@app.route('/')
def index():
    return render_template('index.html')

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