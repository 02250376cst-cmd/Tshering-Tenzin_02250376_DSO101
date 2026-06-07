# Reflection — DSO101 Assignment 3

**Student:** Tshering Tenzin  
**Student ID:** 02250376  
**Module:** DSO101 — Continuous Integration and Continuous Deployment

---

## What I Did

In this assignment, I configured a GitHub Actions workflow to fully automate the CI/CD pipeline for the Todo List application. Every time code is pushed to the `main` branch, GitHub Actions automatically builds Docker images for both the frontend and backend, pushes them to Docker Hub, and triggers redeployment on Render.com via a webhook  all without any manual steps.

---

## What I Learned

### 1. GitHub Actions Is CI/CD Inside Your Repository
Unlike Jenkins which requires a separate server to install and manage, GitHub Actions runs directly inside GitHub. The workflow file lives in `.github/workflows/` as part of the repository itself — which means pipeline configuration is version-controlled alongside the application code.

### 2. Secrets Keep Credentials Safe
One of the most important practices I learned is never hardcoding credentials in workflow files. GitHub provides a Secrets store where sensitive values (Docker Hub token, Render webhook URLs) are saved and referenced as `${{ secrets.SECRET_NAME }}` in the workflow. This way, credentials never appear in the code or logs.

### 3. Render Does Not Auto-Pull New Docker Images
I learned that Render does not automatically detect when a new image is pushed to Docker Hub. To trigger a redeployment, you must call a **Deploy Hook** — a unique URL provided by Render that, when called with a POST request, tells Render to pull the latest image and redeploy. This is done in the workflow using a simple `curl` command.

### 4. Docker Hub Access Tokens vs Passwords
GitHub Actions should never use your Docker Hub password directly. Instead, Docker Hub provides **Access Tokens** that can be scoped and revoked independently. I learned to create a dedicated token for GitHub Actions, which is a better security practice than using the main account password.

### 5. The `latest` Tag Convention
I learned the convention of pushing two tags for each image: the student ID tag (`02250376`) for a permanent, identifiable version, and `latest` for the most recent build that Render will always pull when redeploying.

### 6. Workflow Triggers
The `on: push: branches: ["main"]` trigger means the pipeline only runs when code is pushed to `main`, not on feature branches. This is intentional — you only want to deploy tested, merged code, not every experimental branch.

---

## Challenges Faced

### Render Not Redeploying After Image Push
The biggest challenge was discovering that pushing a new image to Docker Hub does NOT automatically trigger Render to redeploy. After researching the Render documentation, I found the Deploy Hook feature — a webhook URL that must be called explicitly. Adding a `curl` step at the end of the workflow fixed this.

### Docker Hub Authentication Failing
Initially the login step failed because I used my Docker Hub password instead of an Access Token. GitHub Actions requires a token with appropriate permissions. Creating a dedicated Access Token in Docker Hub's Security settings and saving it as a GitHub secret resolved this.

### Wrong Image Name in Workflow
The first run failed because the image name in the `docker build` command didn't match the repository name on Docker Hub. The format must be exactly `username/repository-name:tag` — any mismatch causes the push to fail with a `denied: requested access to the resource is denied` error.

### Build Context Path
Since the Dockerfile is inside `practical1/todo-app/backend/` rather than the repo root, I had to specify the correct build context path in the workflow: `docker build -t ... ./practical1/todo-app/backend`. Using the wrong path caused Docker to not find the Dockerfile.

---

## What I Would Do Differently

- **Set up all secrets before writing the workflow**, to avoid the first run failing due to missing credentials.
- **Test the Render webhook manually** using `curl` from the terminal before adding it to the workflow, to verify the URL works.
- **Add a test stage** to the workflow before the build stage, so a failing test prevents a broken image from being pushed.
- **Use matrix builds** to build frontend and backend in parallel, reducing total pipeline time.

---

## Conclusion

This assignment showed me how CI/CD can be fully automated without any external tools beyond GitHub itself. The combination of GitHub Actions, Docker Hub, and Render creates a complete deployment pipeline where a single `git push` results in a live, updated application. The key insight was understanding the gap between Docker Hub (image registry) and Render (deployment platform) and how the Deploy Hook bridges them.