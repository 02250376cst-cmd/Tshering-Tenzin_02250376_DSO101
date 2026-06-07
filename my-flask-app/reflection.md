# Reflection — DSO101 Assignment 4

**Student:** Tshering Tenzin  
**Student ID:** 02250376  
**Module:** DSO101 — Continuous Integration and Continuous Deployment

---

## What I Did

In this assignment, I created a simple static HTML web application, pushed it to a GitHub repository, set up a GitHub Actions workflow for CI/CD automation, and deployed the application live on Render.com. The goal was to demonstrate the complete flow from writing code to having it live on the internet automatically.

---

## What I Learned

### 1. The Full Git Workflow
I practised the complete Git workflow from scratch: `git init`, `git add`, `git commit`, `git branch -M main`, `git remote add origin`, and `git push`. Each command has a specific purpose and the order matters — trying to push before setting the remote, for example, causes an error. Going through this manually made each step meaningful rather than just clicking buttons.

### 2. GitHub Actions for Simple Pipelines
I learned that GitHub Actions doesn't have to be complex. Even a minimal workflow with just a checkout step and a `curl` to trigger a deploy hook is a valid, working CI/CD pipeline. The key concept is that the workflow runs automatically on every `git push` to `main` — removing the need to manually trigger deployments.

### 3. Render Static Sites vs Web Services
Render offers different service types for different use cases. A **Static Site** is ideal for plain HTML/CSS files — it has no build step, no server to manage, and deploys almost instantly. A **Web Service** is for applications that need a running server process (like Node.js or Flask). Choosing the right type avoids unnecessary configuration.

### 4. Deploy Hooks as the Bridge Between GitHub and Render
I learned that Render doesn't watch GitHub directly when deploying from a Docker image or when using a webhook-based flow. A **Deploy Hook** is a unique URL that, when called, tells Render to redeploy. By calling this URL from GitHub Actions using `curl`, the two platforms are connected — a push to GitHub results in a live update on Render.

### 5. Secrets in GitHub Actions
Even for a simple project, credentials should never be in the code. The Render Deploy Hook URL is a secret because anyone who has it can trigger a redeployment of your app. Storing it as a GitHub Secret and referencing it as `${{ secrets.RENDER_DEPLOY_HOOK }}` keeps it secure.

---

## Challenges Faced

### Workflow File Not Triggering
My first attempt at creating the workflow file failed to trigger because I placed it in `.github/workflow/deploy.yml` (missing the `s`). GitHub Actions only reads from `.github/workflows/` (plural). Renaming the folder fixed it immediately.

### Render Not Auto-Deploying
When I first connected the GitHub repo to Render, I assumed it would auto-deploy on every push. However, auto-deploy only works when Render is connected directly to a GitHub repo (not image-based). For webhook-based deploys, the `curl` step in the workflow is required. Once I added the Deploy Hook URL as a secret and called it in the workflow, deployments became fully automatic.

### Live URL Not Showing Updated Content
After a successful deployment, the browser was still showing the old version of the site. The issue was browser caching. A hard refresh (Ctrl+Shift+R) cleared the cache and showed the updated content. This is a common gotcha when working with static sites.

---

## What I Would Do Differently

- **Double-check the workflows folder name** (plural `workflows`, not singular) before pushing — it's an easy mistake that wastes a run.
- **Test the Deploy Hook with `curl` manually** before adding it to the workflow, to confirm it actually triggers a redeployment.
- **Add a status notification step** to the workflow (e.g., a Slack or email notification) so I know immediately when a deployment succeeds or fails.

---

## Conclusion

This assignment reinforced the core CI/CD concept in its simplest form: write code, push to GitHub, and have it automatically appear live on the internet. Even without Docker or complex pipelines, the fundamental loop of `git push → Actions runs → Render deploys` is the foundation of modern software delivery. Building it from scratch with a simple HTML file made each piece of the process clear and concrete.