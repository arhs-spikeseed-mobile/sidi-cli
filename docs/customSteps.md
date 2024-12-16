
# 🛠️ Custom Steps

*SIDI* provides a set of predefined steps during the initialization of your project, which can be found [here](./purposedSteps.md). 

If these predefined steps do not meet your needs, *SIDI* allows you to create custom steps to execute `bash scripts` and trigger them at specific points during the build process.

---

## ✨ How to Create a Custom Step?

1️⃣ First, create a `customSteps/` folder inside the `.sidi/` directory generated during initialization:
   - If `.sidi/` does not exist yet, you can create it manually to prepare your custom steps before running the `init` command.

2️⃣ Within `customSteps/`, create a **separate folder for each custom step**, and place a `step.yml` file inside it where your custom code will reside.

### 🔧 Expected Folder Structure:
```
<project root>
    - .sidi/
        - customSteps/
            - step1/
                - step.yml
            - step2/
                - step.yml
            - step3/
                - step.yml
            - <YOUR_STEP_NAME>/
                - step.yml
```

⚠️ **Important Notes:**
- The YAML structure differs between **Bitrise** and **Codemagic**. Check the examples below to get started:
  - [Example for Bitrise](./../.sidi/customSteps/example_bitrise/step.yml)
  - [Example for Codemagic](./../.sidi/customSteps/example_codemagic/step.yml)
- Ensure there are no line breaks at the end of your YAML file.

---

## 🚀 How to Use Your Custom Step?

After creating custom steps, *SIDI* will detect them during:
- **Initialization (`init` command):** If the steps are created beforehand, they will be suggested during the creation of each workflow, allowing you to inject them at any point in the build.
- **Editing (`edit` command):** If you add steps after initialization, you can modify an existing workflow by adding the custom step wherever needed.

---

## 📦 Using Custom Steps in the Publishing Process (Codemagic Only)

During workflow creation, *SIDI* will ask if you want to:
1. Add a custom step.
2. Add a custom step **specifically during the publishing process**.

Select **yes** for the second option and choose the desired custom step as explained in the previous section.
