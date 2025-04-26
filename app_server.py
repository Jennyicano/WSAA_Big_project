from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
import mysql.connector
import dbconfig as db  

from boardgamesDAO import boardgamesDAO

app = Flask(__name__, static_url_path='', static_folder='.')
app.config['CORS_HEADERS'] = 'Content-Type'

# REST API Routes
@app.route('/')
@cross_origin()
def index():
    return render_template('index.html')

#curl "http://127.0.0.1:5000/boardgamesDAO"
@app.route('/boardgamesDAO', methods=['GET'])
def get_all():
    print("getAll app")
    items = boardgamesDAO.getAll() 
    print("llega hasta aquí")
    return jsonify(items)

@app.route('/boardgamesDAO', methods=['POST'])
def add_item():
    data = request.json
    item = boardgamesDAO.add(name=data['name'])
    return jsonify(item.to_dict()), 201

@app.route('/boardgamesDAO/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    data = request.json
    boardgamesDAO.update(item_id, data['name'])
    return jsonify({'id': item_id, 'name': data['name']})

@app.route('/boardgamesDAO/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    boardgamesDAO.delete(item_id)
    return jsonify({'message': 'game deleted'})


# Web UI Route

if __name__ == '__main__':
    app.run(debug=True)