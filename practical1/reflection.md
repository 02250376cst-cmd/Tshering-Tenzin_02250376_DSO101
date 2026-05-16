
# Reflection – Practical 1

## What I Learned
1. **Docker basics** – images vs containers, Dockerfile syntax, port mapping.
2. **Isolation** – the app runs inside a container, unaware of host system.
3. **Reproducibility** – the same image will behave identically on any Docker‑capable machine.

## Challenges Faced & Solutions

### Challenge 1: Container exited immediately after start
**Problem:** When I ran `docker run my-web-app`, the container started and then stopped. Logs showed nothing.  
**Cause:** Flask runs on `127.0.0.1` by default, which is inaccessible outside the container.  
**Solution:** Changed `app.run(host='0.0.0.0')` to bind to all interfaces. After rebuilding the image, the container stayed alive.

### Challenge 2: Port already in use
**Problem:** `docker: Error response from daemon: Bind for 0.0.0.0:5000 failed: port is already allocated`.  
**Cause:** Another service (or a previous container) was using port 5000.  
**Solution:** Mapped host port 8080 instead: `-p 8080:5000`.

### Challenge 3: Dependency installation slow every build
**Observation:** `RUN pip install` ran on every code change because `COPY requirements.txt` was after `COPY app.py`.  
**Fix:** Reordered Dockerfile – copy `requirements.txt` first, then `RUN pip install`, then copy the rest. This caches the dependency layer unless `requirements.txt` changes.

## What Would I Do Differently
- Use a `.dockerignore` file to exclude `__pycache__`, `.git`, etc. → smaller build context.
- Add a health check in the Dockerfile to monitor app readiness.
- Use `docker-compose` if multiple services (database) were needed.

## Connection to Theory
This practical demonstrates **containerization** as a lightweight alternative to virtual machines. The Docker image acts as an immutable artifact, which is the foundation of CI/CD pipelines (later practicals).

## Self-Assessment
- Documentation: included all commands and screenshots.
- Code: Dockerfile is clean, ordered for caching.
- Verification: app reachable at `localhost:8080`.

**Grade expectation:** I believe this meets all configuration requirements (10/10) for this practical.