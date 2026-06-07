# Reflection — DSO101 Assignment 1

**Student:** Tshering Tenzin  
**Student ID:** 02250376  
**Module:** DSO101 — Continuous Integration and Continuous Deployment  

---

## What I Did

In this assignment, I built and deployed a full-stack Todo List application using Docker and Render.com. The application consists of a React frontend, a Node.js/Express backend, and a PostgreSQL database. I containerized both the frontend and backend using Docker, pushed the images to Docker Hub, and deployed all three services on Render.com.

---

## What I Learned

### 1. Environment Variables Behave Differently in Different Contexts
One of the most important lessons I learned was how environment variables work differently depending on the context. Locally, the `.env` file is read at runtime by `dotenv`. On Render, environment variables must be set manually in the dashboard — the `.env` file is never uploaded or used. This is why my backend kept showing `injected env (0)` and failing to connect to the database.

### 2. React Environment Variables Are Baked In at Build Time
I learned that `REACT_APP_*` variables in React are not read at runtime — they are compiled into the JavaScript bundle during `npm run build` (which happens inside `docker build`). This means if I change `REACT_APP_API_URL` in the Render dashboard after the image is already built, it has no effect. I need to update the `.env` file and rebuild the Docker image from scratch every time the API URL changes.

### 3. SSL Configuration Matters for Database Connections
My local PostgreSQL does not support SSL connections, but Render's managed PostgreSQL requires SSL. I learned to handle this by using an environment variable `DB_SSL` to toggle SSL on and off depending on the environment:
```javascript
ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false
```
This allowed the same codebase to work both locally and on Render without code changes.

### 4. Special Characters in Passwords Must Be URL-Encoded
My local PostgreSQL password contained an `@` symbol, which broke the `DATABASE_URL` connection string because `@` is a reserved character in URLs. I learned to encode it as `%40` to fix the issue.

### 5. Internal vs External Database Hostnames on Render
Render provides two types of database connection URLs — Internal and External. The Internal URL (e.g. `dpg-xxxxx-a`) only works when both services are in the same Render region. If the regions don't match, it results in an `ENOTFOUND` DNS error. I learned to always make sure my web service and database are deployed in the same region.

---

## Challenges I Faced

| Challenge | Root Cause | Fix |
|-----------|------------|-----|
| `SSL connection not supported` locally | Local PostgreSQL has no SSL | Set `DB_SSL=false` in local `.env` |
| `SASL: client password must be a string` | `@` in password broke the URL | Encoded `@` as `%40` |
| `injected env (0)` on Render | `.env` file not uploaded to Render | Set env vars in Render dashboard |
| `ENOTFOUND dpg-xxxxx-a` | Services in different regions | Ensured same region for all services |
| Blank task titles in frontend | Frontend built with wrong API URL | Rebuilt Docker image with correct `REACT_APP_API_URL` |

---

## What I Would Do Differently

- Set up environment variables in Render **before** building Docker images to avoid multiple rebuilds.
- Use `DATABASE_URL` from the start instead of individual `DB_HOST`, `DB_USER` etc. variables — it is simpler and works better with Render's managed databases.
- Add proper error handling and logging in the backend to make debugging easier during deployment.
- Document each step with screenshots as I go, rather than trying to recall them at the end.

---

## Conclusion

This assignment gave me practical experience with the full CI/CD workflow from writing application code to containerizing it with Docker, pushing to a registry, and deploying to a cloud platform. The most valuable takeaway was understanding how environment-specific configuration works across local development and cloud deployment environments.