# Reflection — DSO101 Assignment 2

**Student:** Tshering Tenzin  
**Student ID:** 02250376  
**Module:** DSO101 — Continuous Integration and Continuous Deployment  

---

## What I Did

In this assignment, I configured a Jenkins CI/CD pipeline to automate the build, test, and deployment of the Todo List application built in Assignment 1. The pipeline was set up to automatically pull the latest code from GitHub, install dependencies, build the application, run unit tests using Jest, and deploy the Docker image to Docker Hub — all triggered by a single click or a code push.

---

## What I Learned

### 1. What a CI/CD Pipeline Actually Does
Before this assignment, I understood CI/CD as a concept, but setting it up manually made it concrete. A pipeline is essentially a set of automated instructions that run every time code changes. Instead of manually running `npm install`, `npm test`, and `docker push` every time, Jenkins does it automatically and shows exactly which step failed and why.

### 2. Jenkins Plugin System
Jenkins by itself does very little — its power comes from plugins. I learned that you need specific plugins for specific tasks: the NodeJS plugin to run `npm` commands, the Docker Pipeline plugin to build and push images, the GitHub Integration plugin to trigger builds on push, and the JUnit plugin to display test results. Without the right plugins installed, pipeline stages simply fail silently or with cryptic errors.

### 3. Credentials Management in Jenkins
I learned that hardcoding passwords or tokens in a Jenkinsfile is a major security risk. Jenkins has a built-in credentials store where you save sensitive values (GitHub PAT, Docker Hub password) under an ID, and then reference only the ID in the Jenkinsfile. This keeps secrets out of source code entirely.

### 4. React Environment Variables Are Build-Time, Not Runtime
Continuing from Assignment 1, I reinforced my understanding that `REACT_APP_*` variables must be present during `docker build`. In the Jenkins pipeline, this means the environment variable must be injected before the build stage runs, not after.

### 5. JUnit Reports Require Specific Configuration
Jenkins can display test results visually, but only if the test output is in JUnit XML format. Jest doesn't produce this by default — I needed to install `jest-junit` and configure `package.json` to output a `junit.xml` file. Then the Jenkinsfile `junit` step reads that file and publishes the results to the Jenkins UI.

### 6. The Jenkinsfile Is Just Code
I learned that a Jenkinsfile is a Groovy script that lives in the repo alongside the application code. This means pipeline configuration is version-controlled just like the application itself — if the pipeline breaks, you can see exactly what changed and roll it back.

---

## Challenges Faced

### Jenkins Couldn't Find Node.js
When the Install stage ran `npm install`, Jenkins threw a "npm not found" error. The fix was to go to **Manage Jenkins → Tools → NodeJS**, add a NodeJS installation with the name `NodeJS`, and reference it in the Jenkinsfile under `tools { nodejs 'NodeJS' }`. The name must match exactly.

### GitHub Authentication
Using a plain GitHub password no longer works due to GitHub's security policy. I had to generate a Personal Access Token (PAT) with `repo` and `admin:repo_hook` permissions and use that as the password in Jenkins credentials. Once I understood this, the Checkout stage worked immediately.

### JUnit XML File Not Found
After tests ran successfully, Jenkins couldn't find `junit.xml` and the post-stage failed. The issue was that `jest-junit` needs to be told where to write the file. I added this to `package.json`:
```json
"jest-junit": {
  "outputFile": "junit.xml"
}
```
After that, the file was generated in the right place and Jenkins could read it.

### Docker Not Available in Pipeline
The Deploy stage failed because the Jenkins agent didn't have Docker available in its PATH. The fix was to make sure Docker Desktop was running on the host machine and that the Docker Pipeline plugin was installed in Jenkins.

### Correct Directory Structure
My repo has the backend inside `practical1/todo-app/backend/`, not at the root. I had to use `dir('practical1/todo-app/backend')` blocks in the Jenkinsfile to run commands in the correct folder. This was a simple but frustrating mistake that caused several stages to fail before I realized what was happening.

---

## What I Would Do Differently

- **Set up credentials first** before writing the Jenkinsfile, so the pipeline doesn't fail on the very first run due to missing credentials.
- **Test each pipeline stage locally** (run `npm install`, `npm test`, `docker build` manually) before putting them in the Jenkinsfile. If it doesn't work locally, it won't work in Jenkins.
- **Use environment variables for Docker image names** in the Jenkinsfile instead of hardcoding them, to make the pipeline reusable.
- **Add webhook trigger** so the pipeline runs automatically on every GitHub push, rather than manually clicking "Build Now".

---

## Conclusion

This assignment gave me hands-on experience with one of the most widely used CI/CD tools in the industry. Setting up Jenkins manually — installing plugins, configuring credentials, writing a Jenkinsfile, and watching the pipeline execute stage by stage — made the abstract concept of CI/CD very real. The most valuable insight was that a good pipeline catches problems early: if a test fails, the deploy stage never runs, preventing broken code from reaching production.