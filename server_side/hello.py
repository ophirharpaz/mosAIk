import algorithm
from flask import Flask, request
app = Flask(__name__)

@app.route('/')
def basic():
    return 'Hello'


@app.route("/user/<username>", methods=['GET', 'POST'])
def welcome_user(username):
    if request.method == 'POST':
        content = request.get_json()
        print content
        return "Hello, POST %s" % username
    else:
        return 'Hello, GET %s' % username


"""
Function to call the algorthim implemented in algorithm.py
"""
def call_algorithm(input):
    return algorithm.run_algorthim(input)
