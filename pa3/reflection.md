
# Reflection – Practical 3

## What I Learned
1. **Multi‑stage builds** drastically reduce final image size by discarding build tools and intermediate files.
2. **Running as non‑root** is essential for production – a compromised process in a root container can control the host.
3. **`.dockerignore`** is as important as `.gitignore` for keeping images clean and builds fast.
4. **Docker Scout** and **Trivy** give clear vulnerability reports, helping to choose secure base images.

## Challenges & Solutions

### Challenge 1: Permission denied when copying from builder
**Problem:** After `COPY --from=builder /root/.local /home/appuser/.local`, the files were owned by root, and the `appuser` could not access them.  
**Solution:** Added `RUN chown -R appuser:appgroup /app` before switching user. Also set correct directory permissions (`755`).

### Challenge 2: Application failed to find installed packages
**Problem:** `ModuleNotFoundError: No module named 'flask'` even though pip installed it.  
**Cause:** The `--user` flag installed packages to `/root/.local` in the builder stage, but the runtime stage's `PATH` did not include `/home/appuser/.local/bin`.  
**Solution:** Added `ENV PATH=/home/appuser/.local/bin:$PATH` in the runtime stage.

### Challenge 3: Docker Scout reported high‑severity CVEs in python:3.11-slim
**Finding:** The base image had 2 high‑severity vulnerabilities.  
**Mitigation:**  
- Checked if patched versions exist: used `docker scout recommendations my-web-app-optimized` to get a more secure base (e.g., `python:3.11-slim-bookworm`).  
- In a real production environment, we would either accept the risk (if not exploitable in our context) or switch to a distroless image (e.g., `gcr.io/distroless/python3`).

## Security Improvements Made

| Before (Practical 2) | After (Practical 3) |
|----------------------|---------------------|
| Root user inside container | Non‑root `appuser` |
| Writable root filesystem | `read_only: true` (Compose) |
| All Linux capabilities | `cap_drop: ALL` |
| No vulnerability scanning | Scanned with Docker Scout |
| Build context included hidden files | `.dockerignore` excludes them |

## What I Would Do Differently
- Use **distroless** base image for even smaller attack surface (but harder to debug).
- Add a **healthcheck** to the Dockerfile.
- Integrate scanning into CI pipeline (fail build if critical CVEs found).
