
# 🛠️ Purposed Steps

During the `Init` or `Edit` commands, **SIDI** proposes groups of steps from a curated list.
<br>Each group contains multiple steps tailored for specific tasks.

## 📋 Table of Contents
* [build_android](#build_android)
* [build_android_and_deploy](#build_android_and_deploy)
* [build_ios](#build_ios)
* [build_ios_and_deploy](#build_ios_and_deploy)
* [code_quality](#code_quality)
* [promote_app](#promote_app)
* [send_notification](#send_notification)

---

## 🤖 build_android

A group of steps designed for building Android applications. Depending on user choices during `init` or `edit`, this group will:
- Add overlays to application icons.
- Run React Native (or Flutter) and Android tests (Lint, TSC, Prettier, UT, Jest).
- Set the application version and build APK/AAB files.
- Share the APK as CICD artifacts.
- Notify status updates via Slack/Teams.

**List of Steps:**
- [setup_app_assets](./steps.md#setup_app_assets)
- [react_native_pre_build](./steps.md#react_native_pre_build)
- [npm_private_login](./steps.md#npm_private_login)
- [react_native_yarn](./steps.md#react_native_yarn)
- [react_native_lint](./steps.md#react_native_lint)
- [react_native_tsc](./steps.md#react_native_tsc)
- [react_native_prettier](./steps.md#react_native_prettier)
- [react_native_jest](./steps.md#react_native_jest)
- [flutter_pre_build](./steps.md#flutter_pre_build)
- [flutter_yarn](./steps.md#flutter_yarn)
- [flutter_jest](./steps.md#flutter_jest)
- [flutter_prettier](./steps.md#flutter_prettier)
- [flutter_lint](./steps.md#flutter_lint)
- [android_set_manifest_version](./steps.md#android_set_manifest_version)
- [android_build_apk](./steps.md#android_build_apk)
- [send_slack_message](./steps.md#send_slack_message)

---

## 🚀 build_android_and_deploy

Extends `build_android` to include deployment steps:
- Share APK/AAB on Firebase or Play Store.
- Generate changelogs.
- Notify deployment status.

**List of Steps:**
- Same as [build_android](#build_android), plus:
  - [deploy_generate_changelogs](./steps.md#deploy_generate_changelogs)
  - [deploy_to_play_store](./steps.md#deploy_to_play_store)

---

## 🍎 build_ios

A group of steps for iOS builds. Based on user choices, this group will:
- Add overlays to application icons.
- Run React Native (or Flutter) and iOS tests.
- Set the application version and build IPA files.
- Share the IPA as CICD artifacts.
- Notify status updates via Slack/Teams.

**List of Steps:**
- [ios_setup_file_type](./steps.md#ios_setup_file_type)
- [setup_app_assets](./steps.md#setup_app_assets)
- [react_native_pre_build](./steps.md#react_native_pre_build)
- [npm_private_login](./steps.md#npm_private_login)
- [react_native_yarn](./steps.md#react_native_yarn)
- [react_native_lint](./steps.md#react_native_lint)
- [react_native_tsc](./steps.md#react_native_tsc)
- [react_native_prettier](./steps.md#react_native_prettier)
- [react_native_jest](./steps.md#react_native_jest)
- [flutter_pre_build](./steps.md#flutter_pre_build)
- [flutter_yarn](./steps.md#flutter_yarn)
- [flutter_jest](./steps.md#flutter_jest)
- [flutter_prettier](./steps.md#flutter_prettier)
- [flutter_lint](./steps.md#flutter_lint)
- [ios_archive](./steps.md#ios_archive)
- [send_slack_message](./steps.md#send_slack_message)

---

## 🛫 build_ios_and_deploy

Extends `build_ios` to include deployment steps:
- Share IPA files on Firebase or App Store.
- Notify deployment status.

**List of Steps:**
- Same as [build_ios](#build_ios), plus:
  - [deploy_to_itunes](./steps.md#deploy_to_itunes)

---

## 🧹 code_quality

Focused on maintaining code quality. This group will:
- Run Lint, TSC, Prettier, Jest, and audit packages.
- Notify results via Slack/Teams.

**List of Steps:**
- [audit_packages](./steps.md#audit_packages)
- [send_slack_message](./steps.md#send_slack_message)

---

## 🚀 promote_app

Promote your source branch to others.

### Example:
#### Auto detected version from the branch name:

Your current branch is: `branch_1/1.2.3`

`"[\"branch_1\", \"branch_2\", \"branch_3\"]"`

it will merge `branch_1/1.2.3` into `branch_2/1.2.3`, and `branch_2/1.2.3` into `branch_3/1.2.3`

### Manually set version:

`"[\"develop\", \"uat\", \"store\"]" 9.99.9`

It will merge `branch_1/9.99.9` into `branch_2/9.99.9`, and `branch_2/9.99.9` into `branch_3/9.99.9`

### Without any versioned branches:

`"[\"branch_1\", \"branch_2\", \"branch_3\"]"`

It will merge `branch_1` into `branch_2`, and `branch_2` into `branch_3`

## Lint, Coverage, Test...

- `yarn fix` to run the linter and automatically fix your code

**List of Steps:**
- [_promote_app_step](./steps.md#promote_app_step)

---

## 📢 send_notification

Sends notifications based on user preferences:
- Slack.
- Teams.

**List of Steps:**
- [send_slack_message](./steps.md#send_slack_message)
- [send_teams_message](./steps.md#send_teams_message)
