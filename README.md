# sidi-cli

**SIDI** is a human friendly tool to create a yaml file dedicated to be used on Bitrise or Codemagic to **test**, **build**, and **deploy** any mobile project.

---
## Getting started

**SIDI** is a cli tool which will help you to create the YAML file which will be used to config your CI/CD.
<br><br>It will ask you some questions to know what do you want to do on the chosen CI/CD.
<br>And, it will create the workflows, steps, required keys and will inject them into the YAML file which will be generated in an optimized way without any duplicated steps and more consistent as possible.

---
## Why use SIDI?

The setup of a project from scratch on Bitrise and/or CodeMagic can be long and difficult to maintain.

Each CI/CD purpose a different way to set up a project, typically on Bitrise we can do it via the website directly or via the yaml, and CodeMagic only via the YAML file.

Each CI/CD purposes us a different way to create a workflow where we'll be able to do different things. It can be easy to set up and maintain if we have only one workflow but the difficulty increases exponentially with the workflow number increase.

**SIDI** comes into play at exactly this point, you will be able to:
- Create and configure your CI/CD config YAML file
- Update your YAML to benefit from the latest updates/fix
- Switch between **Codemagic** and **Bitrise** easily

### How it works?

**SIDI** will ask:
- Some information related to the project
  - project type (Native Android, Native iOS, React-Native)
  - Application or library
  - Requested CI/CD (Bitrise or CodeMagic)
  - ...
- [Workflows](./docs/workflow.md) 
  - Worfklow's name
  - Steps which should be executed or not

At the end, **SIDI** will generate two file:
  - The main yaml file which will be use per the CI/CD to launch builds
    - ⚠️ This file should never be updated manually, `sidi-cli u` and `sidi-cli u` should be used to do any things, please refer to `Commands Overview` section to see in details their utility.
    - Bitrise requires to copy/paste the content on the website directly, just need to push it for Codemagic
  - The secret file, where we will have different keys to set per the user
    - You have to set values for each keys required to do the build successfully
    - You can refer to [steps](./docs/purposedSteps.md) file to know what expected, if it's an optionnal key or not..

### Features

#### Supported CI/CD
| CI/CD                             | Supported          |
|----------------------------------|--------------------|
| Bitrise                          | :white_check_mark: |
| CodeMagic                        | :white_check_mark: |

#### Supported project types
| Project type   | Supported          |
|----------------|--------------------|
| React Native   | :white_check_mark: |
| Native iOS     | :white_check_mark: |
| Native Android | :white_check_mark: |

### Installation

```bash
yarn global add sidi-cli

OR

npm install -g sidi-cli
```

## Commands Overview

Some commands are made available by SIDI to meet your needs.

List of commands available with **SIDI** can be found [there](./docs/commands.md)

---
## Purposed steps

When you will create a workflow, **SIDI** will request to choose a group, which will inject all steps used in this group, based on project's information and input from users.

List of purposed steps available with **SIDI** can be found [there](./docs/purposedSteps.md)

---
## FAQ

#### How can we add iOS certificates to be able to archive and export a build?

[Explanation](./docs/iosCertificates.md)

#### How can we set an Android keystore to a workflow?

[Explanation](./docs/androidSigning.md)


#### How can we customize the push event triggered for each workflow?

[buildTriggers](./docs/buildTriggers.md)
