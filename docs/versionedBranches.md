
### Git Workflow

To ensure consistency at the Git level, a strategy has been defined concerning branch naming conventions, workflows, and versioning. This approach is inspired by the [GitFlow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

---

#### **Main Branches**

The primary branches in the repository are:

- **`develop`**: Used for development purposes, testing new features, and ongoing work.
- **`test`**: Used by the QA team to validate new features, check for regressions, and ensure that all changes meet expectations.
- **`master`**: The production branch, representing the stable and released version.

> **Note:** These branches are protected, and direct commits are not allowed.

---

#### **Branch Versioning**

Each branch is versioned to easily identify ongoing and completed versions while seamlessly integrating with the CI/CD pipeline. For example:

- `develop/1.0.0`
- `test/1.0.0`
- `master/1.0.0`

For upcoming releases, ongoing work might look like:

- `develop/2.0.0`

> **Semantic Versioning**: Branch versions follow the format `X.Y.Z`, where:
> - `X`: Major version
> - `Y`: Minor version
> - `Z`: Patch version

---

#### **Feature and Fix Branch Naming Convention**

A standardized naming convention is used for feature and fix branches to enhance traceability. The format is:

```
[typeOfTask]/[version]/[jiraTaskID]/[description]
```

- **`typeOfTask`**: Type of task, e.g., `feat` (feature) or `fix` (bug fix).
- **`version`**: Application version affected by the branch.
- **`jiraTaskID`**: The corresponding Jira task ID.
- **`description`**: A brief description of the task.

**Example**:
```
feat/7.0.0/TEAM-13/add-new-feature
```

---

#### **Features**

All new features should be developed in dedicated branches. Developers must create these branches from the appropriate `develop` version branch.

**Example**:  
For a new feature targeting release `8.0.0`, create the branch from `develop/8.0.0`.

To merge feature branches into `develop`, a pull request must be created and reviewed.

---

#### **Fixes**

Bug fixes follow a similar process to features:

- For a **hotfix** on version `7.0.0` in `master`, create the branch from `develop/7.0.0`.  
  > This ensures that new features targeting `8.0.0` (on `develop/8.0.0`) remain unaffected.

- Once the fix is completed, update the version (e.g., `develop/7.0.1`), merge the branch, and repeat the process for `test` and `master`.

---

This workflow provides clear versioning, maintains consistency across branches, and simplifies tracking work in progress.
