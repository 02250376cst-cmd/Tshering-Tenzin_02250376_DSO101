
---

## `reflection.md`

```markdown
# Reflection – Practical 2

## What I Learned
1. **Service Discovery** – Docker Compose automatically creates a DNS record for each service. The web app can connect to `redis` by that hostname without needing IP addresses.
2. **Declarative Infrastructure** – A single `docker-compose.yml` file describes the entire stack (web app, database, network). This is much cleaner than writing multiple `docker run` commands.
3. **Persistence via External Store** – Redis stores the visit count independently of the web container. Restarting the web container does not reset the counter.

## Challenges Faced & Solutions

### Challenge 1: Port 8080 Already in Use
**Problem:** When running `docker-compose up`, I got:
> `Error: ports are not available: exposing port TCP 0.0.0.0:8080 -> bind: Only one usage of each socket address`

**Diagnosis:**  
- Used `netstat -aon | findstr :8080` (Windows PowerShell) and found a process (PID 1234) using port 8080.
- That process was the container from Practical 1 (`my-running-app`) still running.

**Solution Tried First:**  
Stopped the old container:  
```bash
docker stop my-running-app
docker rm my-running-app
```
But port 8080 was still blocked by another service (maybe a local IIS or Jenkins).

### Final Solution:
Instead of fighting the port, I edited docker-compose.yml to use a different host port:

yaml
ports:
  - "8081:5000"
Then I ran docker-compose up --build -d again. The application worked at http://localhost:8081.

Lesson: When a port is occupied, changing the host-side mapping is often faster than hunting down the blocking process. In production, use reverse proxies or dynamic port allocation.

Challenge 2: Web Container Exited Immediately (First Attempt)
Problem: Before adding Redis, the Flask container started and then stopped.
Cause: Flask default binding 127.0.0.1 is not reachable from the host.
Solution: Used host='0.0.0.0' in app.run(). This is already in the code.

Challenge 3: Redis Connection Refused on First Try
Problem: Web container could not connect to Redis even with depends_on.
Cause: depends_on only waits for the container to start, not for the service to be ready. Redis takes ~1 second to initialize.
Solution (not implemented in this practical but learned): Add a health check to Redis and use condition: service_healthy in depends_on. For this practical, adding a small retry loop in app.py would also work.

### What I Would Do Differently
Use environment variables for Redis host and port to make the app more configurable.

Add a .dockerignore file to exclude __pycache__, .git, and other unnecessary files from the build context.

Implement a health check in the Dockerfile or compose file to ensure Redis is ready before the web app starts.

Persist Redis data with a volume if the counter needs to survive docker-compose down (add volumes: - redis-data:/data).

## Connection to CI/CD (Future Practicals)
Docker Compose is ideal for integration testing in CI pipelines. For example, a Jenkins pipeline could run:

bash
docker-compose up --build --abort-on-container-exit
This starts the full stack, runs tests, then stops everything.