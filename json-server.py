import json
from flask import Flask, jsonify
app = Flask(__name__)

obj = {
    "counter": 0
}

@app.route('/polyanets', methods=['POST'])
def create_polyanet():
    if(obj['counter']<8):
        obj['counter']=obj['counter'] + 1
        return 'too many requests', 429
    return '',201

@app.route('/comeths', methods=['POST'])
def create_cometh():
    return '',201

@app.route('/soloons', methods=['POST'])
def create_soloon():
    return '',201

@app.route('/map/3b2e6a67-9043-48e0-9fd8-3fe7cbe04962/goal', methods=['GET'])
def get_goal():
    print("attempting to create")
    return jsonify({
        "goal": [
          ['POLYANET', 'SPACE', 'SPACE'],
          ['SPACE', 'SPACE', 'SPACE'],
          ['SPACE', 'SPACE', 'SPACE'],
        ],
    }),201

if __name__ == '__main__':
    print("attempting to create")
    app.run(port=5000)