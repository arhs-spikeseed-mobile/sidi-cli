# Commands

* [Help](#help)
* [Init](#init)
* [Update](#update)
* [Edit](#edit)
* [Change language](#change-language)

## Help

Will print the list of commands available with small description

### Command

```bash
sidi-cli h
```

## Init

**First command** todo to use SIDI.

This command will ask to the user some informations about the project and workflows

⚠️ This step generates a file (`./.sidi/sidiConfig.json`)

⚠️ Do not update it manually, `Update` and `Edit` features needs it to work as expected


### Command

```bash
sidi-cli i
```


## Update

Based on the config file created during `Init` step.

`Update` command will update your YAML file to benefit from the latest features/fixes.


⚠️ It can be used only if you already launched `Init` before.

⚠️ This step is looking in `.sidi/sidiConfig.json` file created during init step and updated when you launch this step.

### Command

```bash
sidi-cli u
```

## Edit

Based on the config file created during `Init` step
`Edit` command will purpose to edit YAML file's content.

This command allow:
- Add a new workflow
- Delete an existing workflow
- Duplicate an existing workflow
- Edit an existing workflow
    - Add a new step
    - Delete a step
    - Delete a custom Step
    - Edit push event triggerer (CodeMagic only)
    - Set Android signing key (CodeMagic only)
    - Edit max build duration (CodeMagic only) (default 120 min)
- Change the CI/CD (CodeMagic <==> Bitrise)

Based on your input, it will regenerate/update your YAML file.

⚠️ It can be used only if you already launched `Init` before.

⚠️ This step is looking in `.sidi/sidiConfig.json` file created during init step and updated when you launch this step.

### Command

```bash
sidi-cli e
```

## Change language

To change cli's language
Supported languages: English, French

### Command

```bash
sidi-cli l
```