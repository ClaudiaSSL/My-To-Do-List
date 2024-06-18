from flask import Flask, jsonify, request, Response
from flask_cors import CORS, cross_origin
import uuid

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

TASKS = [
    {
        'id': uuid.uuid4().hex,
        'description': 'Buy some food',
        'for': 'Home',
        'done': True
    },
    {
        'id': uuid.uuid4().hex,
        'description': 'Clean the house',
        'for': 'Home',
        'done': False
    },
    {
        'id': uuid.uuid4().hex,
        'description': 'Pay Taxes',
        'for': 'Finances',
        'done': True
    }
]
# sanity check route
@app.route('/ping', methods=['GET'])
def ping_pong() -> Response:
    return jsonify('pong!')

@app.route('/tasks', methods=['GET', 'POST'])
def all_tasks() -> Response:
    response_object = {'status': 'success'}
    if request.method == 'POST':
        post_data = request.get_json()
        task = {
            'id': uuid.uuid4().hex,
            'description': post_data.get('description'),
            'for': post_data.get('for'),
            'done': post_data.get('done')
        }
        TASKS.append(task)
        response_object['message'] = 'Task added!'
        response_object['id'] = task['id']
    else:
        response_object['tasks'] = TASKS
    return jsonify(response_object)

if __name__ == '__main__':
    app.run()

@app.route('/tasks/<task_id>', methods=['PUT', 'DELETE'])
@cross_origin()
def single_task(task_id:str) -> Response:
    response_object = {'status': 'success'}
    if request.method == 'PUT':
        post_data = request.get_json()
        remove_task(task_id)
        task = {
            'id': uuid.uuid4().hex,
            'description': post_data.get('description'),
            'for': post_data.get('for'),
            'done': post_data.get('done')
        }
        TASKS.append(task)
        response_object['message'] = 'Task updated!'
        
    if request.method == 'DELETE':
        remove_task(task_id)
        response_object['message'] = 'Task removed!'
        
    return jsonify(response_object)

def remove_task(task_id:str) -> bool:
    for task in TASKS:
        if task['id'] == task_id:
            TASKS.remove(task)
            return True
    return False