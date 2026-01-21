---
trigger: always_on
---

# Git Automation & Commit Standards

You must adhere to the following workflow for version control to ensure incremental progress tracking and high-quality commit history.

## 1. Incremental Commit Workflow
- **Commit After Each Task**: You must perform a Git commit immediately after completing each sub-task defined in the Implementation Plan.
- **Verification Before Commit**: Before committing, ensure the code is free of syntax errors and passes relevant tests (if any).
- **Sequential Execution**: Do not proceed to the next task until the current changes are staged and committed.

## 2. Commit Message Convention
All commit messages must follow the **Conventional Commits** specification to maintain a professional and readable history.

**Format:** `<type>(<scope>): <description>`

### Allowed Types:
- `feat`: A new feature or significant logic change.
- `fix`: A bug fix.
- `refactor`: Code change that neither fixes a bug nor adds a feature.
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
- `docs`: Documentation only changes.
- `test`: Adding missing tests or correcting existing tests.
- `chore`: Changes to the build process or auxiliary tools and libraries.

### Guidelines for <description>:
- Use the imperative, present tense: "change" not "changed" nor "changes".
- Identify the specific task ID (if available) at the end of the message (e.g., "feat(auth): implement JWT login logic [#101]").
- Do not simply repeat the task title; describe the **actual changes** made in the code.
- Keep the first line under 50 characters.

## 3. Automation Steps
After completing a task:
1. Run `git add .` to stage all changes related to the task.
2. Formulate a descriptive commit message based on the actual diff.
3. Execute `git commit -m "<type>(<scope>): <description>"`
4. Log the commit hash in your thought process to confirm successful versioning.