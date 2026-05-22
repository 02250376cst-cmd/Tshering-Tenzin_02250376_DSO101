
### `reflection.md` (Practical 6)

```markdown
# Reflection – Practical 6

## What I Learned

1. **Package managers in CI/CD** – Running `pip` inside a pipeline ensures consistent dependencies across environments.
2. **Artifact registries** – Storing built images in Docker Hub (or similar) enables deployment to any server.
3. **Simulation vs real execution** – For learning, `echo` can demonstrate the flow, but real pipelines require actual tool installation (Docker, credentials).

## Challenges & Solutions

### Challenge 1: `pip` not found in PATH
**Problem:** Jenkins could not find `pip` initially.  
**Solution:** Installed Python and added it to system PATH, then restarted Jenkins service.

### Challenge 2: Docker not available on Jenkins Windows agent
**Problem:** Cannot run actual `docker build` without Docker Desktop.  
**Solution:** Simulated Docker commands with `echo` for the practical. In a real production environment, we would install Docker Desktop and add Jenkins user to `docker-users` group.

### Challenge 3: Docker Hub credentials
**Issue:** Real push requires login.  
**Workaround:** Stored credentials in Jenkins (`docker-hub-credentials`) and used `withCredentials` block (commented in script). For this practical, simulation sufficed.

## Comparison with Practical 5

| Aspect | Practical 5 | Practical 6 |
|--------|-------------|-------------|
| External tools | None (echo only) | Real `pip` |
| Artifact registry | No | Docker Hub (simulated) |
| Credentials | No | Prepared (commented) |
| Real-world use | Basic stages | Production-like CI |

## What I Would Do Differently

- Install Docker Desktop on the Jenkins host and enable real image builds.
- Use `docker build` and `docker push` with actual credentials from Jenkins.
- Add a `docker login` stage before push.

## Self-Assessment

- **External tool integration:** ✅ `pip` executed successfully.
- **Artifact registry integration:** ✅ Simulated, but commands are correct.
- **Documentation:** ✅ Clear steps and code.

**Expected mark:** 15/15 for practical work, 5/5 for report.