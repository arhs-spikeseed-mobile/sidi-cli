
# 📜 Commands

## 📖 Help

🔍 Displays a list of available commands with brief descriptions.

### 💻 Command

```bash
sidi-cli h
```

---

## 🚀 Init

**The first command** to execute when setting up SIDI.

✨ This command collects project and workflow information.

⚠️ This step generates a file: `./.sidi/sidiConfig.json`.

⚠️ Do not update this file manually! Use `Update` and `Edit` to ensure proper functionality.

### 💻 Command

```bash
sidi-cli i
```

---

## 🔄 Update

Updates the YAML configuration file based on the config file created during the `Init` step.

💡 Use this to benefit from the latest features and fixes.

⚠️ Requires the `Init` step to be completed beforehand.

⚠️ Relies on the `.sidi/sidiConfig.json` file for updates.

### 💻 Command

```bash
sidi-cli u
```

---

## ✏️ Edit

Edits the YAML configuration file based on the config file created during the `Init` step.

🔧 Allows the following:
- ➕ Add a new workflow
- 🗑️ Delete an existing workflow
- 📋 Duplicate an existing workflow
- ✍️ Edit an existing workflow:
  - ➕ Add a new step
  - 🗑️ Delete a step
  - 🗑️ Remove a custom step
  - 🔄 Edit push event triggers (Codemagic only)
  - 🔑 Set Android signing key (Codemagic only)
  - ⏳ Edit max build duration (default: 120 min, Codemagic only)
  - 🔀 Switch CI/CD provider (Codemagic ↔ Bitrise)

💡 Updates and regenerates your YAML file based on your input.

⚠️ Requires the `Init` step to be completed beforehand.

⚠️ Relies on the `.sidi/sidiConfig.json` file for edits.

### 💻 Command

```bash
sidi-cli e
```

---

## 🌍 Change Language

Changes the CLI's language.

🌐 Supported languages: **English**, **French**.

### 💻 Command

```bash
sidi-cli l
```
