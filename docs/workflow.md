# Worfklow

## What's a workflow?

A workflow is a set of settings that determines how your app is to be built, tested and published.

You can create several workflows for building different configurations of your app. For example, you can use workflows to build different branches of the project, separate your debug and release builds, run builds for different projects or flavors in the repository, test your app with different software versions, and so on.

Thanks to the secret file generated at the end of SIDI, you can configure your secret per workflow.

You can recognize workflow's keys with the name athe end of the key.

eg. if you workflow's name is `KAWAII`, all keys (.eg `P_ANDROID_BUILD_VARIANT_KAWAII`) which end with its name will be used during the build.