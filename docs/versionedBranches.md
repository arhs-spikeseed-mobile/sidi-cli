
# 🌱 Versioned Branches & Git Workflow

A consistent Git workflow ensures efficient collaboration and seamless CI/CD integration. This document outlines a strategy inspired by [Gitflow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

---

## 🌟 Main Branches

The following main branches form the backbone of the Git workflow:

- **`develop`**: For the development environment; used to test new features during active development.
- **`test`**: For the QA team; ensures no regressions and verifies that new features meet expectations.
- **`master`**: Represents the production environment.

⚠️ **Important:** These branches must be protected to prevent direct commits. Use pull requests for changes.

---

## 🏷️ Branch Versioning

To ensure clarity and maintainability, each branch is versioned. This approach helps identify and modify specific versions while integrating seamlessly with CI/CD pipelines.

### 📚 Example Branch Versions:

- `develop/1.0.0`
- `test/1.0.0`
- `master/1.0.0`
- Upcoming versions: `develop/2.0.0`

### 🔢 Semantic Versioning:
We follow the `X.Y.Z` convention:
- `X`: Major version
- `Y`: Minor version
- `Z`: Patch version

---

## 🛠️ Feature & Fix Branch Naming Convention

To streamline tracking, branch names adhere to the following convention:

```
[typeOfTask]/[version]/[jiraTaskID]/[description]
```

### Components:
- **typeOfTask**: Use `feat` for features or `fix` for bug fixes.
- **version**: The application version related to the branch.
- **jiraTaskID**: The associated Jira task ID.
- **description**: A brief task description.

### ✏️ Example:
`feat/7.0.0/TEAM-13/add-new-feature`

---

## 🚀 Feature Workflow

Each feature is developed on its own branch:

1. Create the feature branch from the corresponding `develop` version branch.
2. For example, for a feature in the upcoming `8.0.0` release:
   - Branch from `develop/8.0.0`.
3. Submit a pull request to merge the branch into `develop`.

---

## 🔧 Fix Workflow

Fixes follow a similar workflow:

1. Create a branch for the fix.
2. Example: For a hotfix in `master/7.0.0`:
   - Investigate and create a branch from `develop/7.0.0`.
3. Complete the fix and create a branch for the new version:
   - E.g., `develop/7.0.1`.
4. Merge the fix branch and follow the same process for `test` and `master`.

---

## 🔍 Key Benefits

- Easily distinguish between versions in progress.
- Simplified tracking and modification of specific versions.
- Clear segregation of features and fixes for better code management.

By adopting this workflow, teams can ensure consistency and maintainability across all versions in development and production.
