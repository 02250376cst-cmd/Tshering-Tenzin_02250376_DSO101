from flask import Flask
from redis import Redis

app = Flask(__name__)
redis = Redis(host='redis', port=6379)

@app.route('/')
def hello():
    count = redis.incr('visits')
    return f"Hello from Docker! This page has been visited {count} times."

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)