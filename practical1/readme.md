# Practical 1: Docker Environment & Containerization

## Objective
Set up Docker on a local machine and containerize a simple Flask web application.

## Tools Used
- Docker version 24.0.x
- Python 3.11
- Flask 2.3.3

## Implementation Steps

### 1. Docker Installation Verification
```bash
$ docker --version
Docker version 24.0.6, build ed223bc

$ docker run hello-world
# ... "Hello from Docker!" message ...

![alt text](<Screenshot 2026-05-16 171255.png>)

2. Application Code
app.py – a Flask server returning a simple message.
requirements.txt – lists Flask dependency.

3. Dockerfile
dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app.py .
EXPOSE 5000
CMD ["python", "app.py"]
Explanation:

python:3.11-slim – lightweight base image

WORKDIR – sets working directory

COPY & RUN – install dependencies

EXPOSE – documents the port

CMD – command to run the app

4. Building the Image
bash
$ docker build -t my-web-app .

    ![build](image-1.png)

Output shows successful layer caching and image ID.

5. Running the Container
bash
$ docker run -d -p 8081:5000 --name my-running-app my-web-app
Check container status: docker ps

6. Verification
Open browser at http://localhost:8081:

![alt text](<Screenshot 2026-05-16 171255.png>)

Or using curl:

bash
$ curl http://localhost:8080
Hello from inside a Docker container!

7. Cleanup (optional)
bash
docker stop my-running-app
docker rm my-running-app
docker rmi my-web-app
Configuration Requirements Met
Docker installed and functional

Dockerfile correctly written (multi‑step build not required but good practice)

Image builds without errors

Container runs with port mapping

Application accessible via browser

Troubleshooting Encountered
Port already in use: Changed host port from 5000 to 8080.

Container exits immediately: Added -d and ensured Flask runs on 0.0.0.0.

