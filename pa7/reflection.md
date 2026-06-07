
---

### `reflection.md` (Practical 7)

```markdown
# Reflection – Practical 7

## What I Learned
- Shared libraries reduce duplication and make pipelines modular.
- The `load` step is a simple way to import Groovy scripts from the workspace.
- In production, Global Pipeline Libraries with Git provide versioning and reuse across many jobs.
- Functions in shared libraries must be defined correctly (named function returning `this` or using `call`).

## Challenges & Solutions
- **Initial error: `Cannot invoke method call() on null object`** – the `load` step returned `null` because the Groovy script lacked a proper return value. **Solution:** Added `return this` and used a named function `sayHello` instead of relying on `call`.
- **Windows path issues** – used `bat 'if not exist libs mkdir libs'` to conditionally create directory.
