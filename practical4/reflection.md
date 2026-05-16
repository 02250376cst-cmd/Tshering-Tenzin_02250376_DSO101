
# Reflection – Practical 4

**Student:** Tshering Tenzin  
**Practical:** Jenkins Server & Basic CI/CD Pipeline

## What I Learned
1. **Jenkins as a CI/CD server** – Automates building, testing, and deploying code.
2. **Dockerized Jenkins** – Running Jenkins in a container isolates it, but requires volume persistence for jobs/plugins.
3. **Declarative Pipeline syntax** – Clean, structured way to define stages with `post` actions.
4. **Jenkins UI** – Navigating jobs, console output, build history.

## Challenges & Solutions

### Challenge 1: Jenkins container could not access host Git repository
**Problem:** Using `file:///C:/path` for a local Git repo failed because the Jenkins container runs in a different filesystem.  
**Solution:** Used a simulated checkout with `echo` commands. For real Git integration, I would either:
- Push the repo to GitHub and use HTTPS URL.
- Bind mount the host Git repo into the Jenkins container (`-v /host/path:/repo`) and reference it.

### Challenge 2: Initial admin password not found on first `docker logs`
**Problem:** The password appears only after Jenkins fully initialises (takes ~2 minutes).  
**Solution:** Waited a few minutes and ran `docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword` – it worked.

### Challenge 3: Docker socket permission on Windows
**Problem:** Mapping `/var/run/docker.sock` on Windows Docker Desktop is possible but not essential for this practical.  
**Solution:** Skipped the socket mapping – the pipeline only uses `sh` commands, no Docker builds inside Jenkins.
