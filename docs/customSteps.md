# Custom steps

*SIDI* purpose a set of steps during the initialization of your project, which can be found [there](./purposedSteps.md).

At the end, if you don't find your need, *SIDI* allows to create custom steps to execute `bash script` and trigger when you want during the build.

## How to create a custom step?

Firstly, you have to create a folder `customSteps/` in `.sidi/` folder generated at the end of the initialization
    - `.sidi/` can be created manually if you want prepare your custom steps before launching init command

Now you will have to create *one folder per custom step* in `customSteps/` and place your `step.yml` file where you should place your code.

Expected architecture:
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

⚠️ The architecture of the expected YAML file is not the same for Bitrise and Codemagic, please be careful to have a look at examples listed below to have a good start and place your code

⚠️ Please pay attention to not have a line break at the end of your YAML file

[Example of expected yml file for Bitrise](./../.sidi/customSteps/example_bitrise/step.yml)

[Example of expected yml file for CodeMagic](./../.sidi/customSteps/example_codemagic/step.yml)

## How to use your custom step?

Now that you have created your custom steps, *SIDI* will detect them during:
    -  If you created steps before the `init` command, they will be purposed during the creation of *each* workflow, and you will be able to inject them to execute it before any step in the build.
    -  If you created them when you already initialized, and want to add it to a worklfow. You can launch `edit` command to edit a workflow and select `Add a custom step` and place it where yo want

## How to use a custom step during the publishing process (at the end of the build) (CodeMagic only)?

During the creation of your workflow, SIDI will request if you want add a custom step, and if you want *add a custom step during the publishing process*.

Just have to select yes for the second one and select your custom step as explained in the previous point.
