
---

### `reflection.md` (Practical 5)

```markdown
# Reflection – Practical 5


## What I Learned

1. **Declarative syntax** is more organised than Scripted Pipeline. The `stages` block clearly separates each step of CI/CD.
2. **Windows vs Linux differences** – Jenkins on Windows requires `bat` instead of `sh`. This is a critical lesson for cross-platform CI/CD.
3. **Environment variables** in pipelines allow reuse and make scripts portable across environments.
4. **`post` blocks** can trigger actions (notifications, cleanup) after pipeline completion regardless of outcome.

## Challenges & Solutions

### Challenge 1: Pipeline failed with "Cannot run program 'sh'"
**Problem:** The pipeline script used `sh` commands, but my Jenkins runs on Windows.  
**Cause:** Windows does not have a Bash shell by default.  
**Solution:** Replaced all `sh` with `bat` (batch) commands. Also adjusted directory paths (using `\\` for backslashes).

### Challenge 2: `mkdir` command failed if directory existed
**Problem:** `bat 'mkdir app'` failed when the directory already existed from a previous build.  
**Solution:** Used `if not exist app mkdir app` to conditionally create the directory.

### Challenge 3: Environment variable expansion in batch
**Problem:** Initially unsure if `%APP_NAME%` would work inside `bat`.  
**Solution:** Tested and confirmed that Jenkins environment variables are accessible in `bat` using the same syntax. Verified by printing the variable.

## Comparison with Practical 4

| Aspect | Practical 4 | Practical 5 |
|--------|-------------|-------------|
| Pipeline type | Basic script | Declarative with stages |
| Stages | Unstructured | Explicit Checkout, Build, Test, Deploy |
| Post actions | Simple (success/failure) | Always, Success, Failure |
| Environment vars | Not used | Used (`APP_NAME`, `VERSION`) |
| Platform adaptation | Did not work initially | Adapted for Windows (`bat`) |

## What I Would Do Differently

- Use **Pipeline from SCM** (Jenkinsfile in Git) instead of inline script for version control.
- Add **actual Docker build** and test steps (requires Docker installed on the Jenkins agent).
- Integrate **GitHub webhook** for automatic trigger on push.

