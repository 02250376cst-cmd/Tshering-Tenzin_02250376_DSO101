
# Reflection – Practical 8

**Student:** Tshering Tenzin  
**Practical:** Complete CI/CD with GitHub Actions

## What I Learned
- GitHub Actions is a powerful, integrated CI/CD solution that requires no external server.
- Workflows are defined as YAML files in `.github/workflows/`.
- Jobs can be sequential (`needs`) or parallel.
- GitHub provides free runners for public repositories.
- Built-in secrets management for sensitive data.

## Challenges & Solutions
- **Challenge: Understanding YAML syntax** – Used GitHub's visual editor initially, then refined in VSCode.
- **Challenge: Docker daemon not available locally** – But GitHub Actions runners have Docker pre-installed, so no issue.
- **Challenge: Simulating deployment** – Used `echo` statements; can replace with real `ssh` or `docker push` commands later.

## Comparison with Jenkins (Practical 4-7)
| Aspect | Jenkins | GitHub Actions |
|--------|---------|----------------|
| Setup | Requires own server/Docker container | Zero setup, runs on GitHub |
| Cost | Free (self-hosted) | Free for public repos |
| Pipeline syntax | Groovy (Declarative) | YAML |
| Triggers | Polling or webhooks | Automatic on Git events |
| Maintenance | Manual updates | Managed by GitHub |

## What I Would Do Differently
- Add deployment to a real cloud server (e.g., AWS, DigitalOcean) using SSH.
- Use GitHub Environments with approval gates for production.
- Add caching for pip dependencies to speed up builds.
