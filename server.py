# Create a server

from flask import Flask, request, jsonify

app = Flask(__name__)
@app.route('/api', methods=['POST'])
def index():
        return  "hello there"
    
if __name__ == '__main__':
    app.run(debug=True)
    

    