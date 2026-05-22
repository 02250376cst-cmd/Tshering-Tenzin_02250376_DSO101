
---

### `reflection.md` (Practical 4)

```markdown
# Reflection – Practical 4

## What I Learned
1. **Jenkins installation** on Windows is straightforward, but port conflicts can occur (8080 was initially occupied by another service).
2. **Declarative Pipeline syntax** is clean and easy to read, with explicit stages and post-actions.
3. **Windows vs Linux differences** – Jenkins on Windows requires `bat` instead of `sh` for shell commands.
4. **CI/CD basics** – The pipeline models the core steps of any CI/CD workflow: checkout, build, test, deploy.

## Challenges & Solutions

### Challenge 1: Port 8080 already in use
**Problem:** Initially, Jenkins could not start because port 8080 was occupied (likely by a previous Docker container or another service).  
**Solution:** Identified the process using `netstat -aon | findstr :8080` and stopped it. After freeing the port, Jenkins started correctly on `localhost:8080`.

### Challenge 2: Pipeline failed with "Cannot run program 'sh'"
**Problem:** My first pipeline used `sh` commands (Linux shell), but Jenkins is running on Windows.  
**Solution:** Replaced all `sh` commands with `bat` (Windows batch) commands. Also used `mkdir folder 2>nul` to suppress errors if the folder already exists.

### Challenge 3: Real Git repository not available
**Problem:** I did not have a remote Git repository ready for checkout.  
**Solution:** Simulated the checkout by creating a dummy directory and file. In a real project, I would replace this with a `git` step and proper credentials.

## Comparison with Docker-based Jenkins (Practical 4 alternative)
- **Docker Jenkins** requires managing volumes and Docker socket (complex on Windows).
- **Native Windows Jenkins** is simpler to set up but requires manual installation of tools (Python, Git, etc.).

## What I Would Do Differently
- Use **Pipeline from SCM** instead of inline script to version-control the Jenkinsfile.
- Set up a **GitHub webhook** to automatically trigger the pipeline on code push.
- Add **email notifications** in the `post` section.

