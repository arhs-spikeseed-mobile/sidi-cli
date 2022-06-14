# Purposed Steps

During `Init` or `Edit` command, **SIDI** will purpose to select a group of step from the proposed list.
<br>Each step actually contains a group of steps.

* [build_android](#build_android)
* [build_android_and_deploy](#build_android_and_deploy)
* [build_ios](#build_ios)
* [build_ios_and_deploy](#build_ios_and_deploy)
* [code_quality](#code_quality)
* [promote_app](#promote_app)
* [send_notification](#send_notification)

## build_android

Based on user choices during init/edit
This group will add steps to:
- Add an overlayer to application(s) icons (app icon)
- React native - Test code (Lint, TSC, Prettier, Jest)
- Android - test code (Lint, UT)
- Android - set application version and build the app (APK/AAB)
- Share the APK on CICD artifacts
- Send status message via Slack/Teams

List fo steps:

- [setup_app_assets](./steps.md#setup_app_assets)
- [react_native_pre_build](./steps.md#react_native_pre_build)
- [npm_private_login](./steps.md#npm_private_login)
- [react_native_yarn](./steps.md#react_native_yarn)
- [react_native_lint](./steps.md#react_native_lint)
- [react_native_tsc](./steps.md#react_native_tsc)
- [react_native_prettier](./steps.md#react_native_prettier)
- [react_native_jest](./steps.md#react_native_jest)
- [android_set_manifest_version](./steps.md#android_set_manifest_version)
- [android_set_version_code_name](./steps.md#android_set_version_code_name)
- [android_run_lint](./steps.md#android_run_lint)
- [android_run_ut](./steps.md#android_run_ut)
- [android_build_apk](./steps.md#android_build_apk)
- [android_build_aab](./steps.md#android_build_aab)
- [deploy_to_cicd](./steps.md#deploy_to_cicd)
- [git_send_tag](./steps.md#git_send_tag)
- [send_slack_message](./steps.md#send_slack_message)
- [send_teams_message](./steps.md#send_teams_message)
- [git_status_ending](./steps.md#git_status_ending)

## build_android_and_deploy

Based on user choices during init/edit
This group will add steps to:
- Add an overlayer to application(s) icons (app icon)
- React native - Test code (Lint, TSC, Prettier, Jest)
- Android - test code (Lint, UT)
- Android - set application version and build the app (APK/AAB)
- Share the APK on CICD artifacts
- Share the APK on Firebase/Store
- Send status message via Slack/Teams

List fo steps:

- same as [build_android](#build_android)
- [sourcemap_to_artifact](./steps.md#sourcemap_to_artifact)
- [deploy_generate_changelogs](./steps.md#deploy_generate_changelogs)
- [deploy_to_firebase_android](./steps.md#deploy_to_firebase_android)
- [deploy_to_play_store](./steps.md#deploy_to_play_store)

## build_ios

Based on user choices during init/edit
This group will add steps to:
- Add an overlayer to application(s) icons (app icon)
- React native - Test code (Lint, TSC, Prettier, Jest)
- iOS - test code (Lint, UT)
- iOS - set application version and build the app
- Share the IPS on CICD artifacts
- Send status message via Slack/Teams

List fo steps:

- [setup_app_assets](./steps.md#setup_app_assets)
- [react_native_pre_build](./steps.md#react_native_pre_build)
- [npm_private_login](./steps.md#npm_private_login)
- [react_native_yarn](./steps.md#react_native_yarn)
- [react_native_lint](./steps.md#react_native_lint)
- [react_native_tsc](./steps.md#react_native_tsc)
- [react_native_prettier](./steps.md#react_native_prettier)
- [react_native_jest](./steps.md#react_native_jest)
- [ios_setup_file_type](./steps.md#ios_setup_file_type)
- [ios_setup_build_number](./steps.md#ios_setup_build_number)
- [ios_setup_certificate_install](./steps.md#ios_setup_certificate_install)
- [ios_setup_pod_install](./steps.md#ios_setup_pod_install)
- [ios_setup_carthage_install](./steps.md#ios_setup_carthage_install)
- [ios_archive](./steps.md#ios_archive)
- [ios_run_ut](./steps.md#ios_run_ut)
- [deploy_to_cicd](./steps.md#deploy_to_cicd)
- [git_send_tag](./steps.md#git_send_tag)
- [send_slack_message](./steps.md#send_slack_message)
- [send_teams_message](./steps.md#send_teams_message)
- [git_status_ending](./steps.md#git_status_ending)

## build_ios_and_deploy

Based on user choices during init/edit
This group will add steps to:
- Add an overlayer to application(s) icons (app icon)
- React native - Test code (Lint, TSC, Prettier, Jest)
- iOS - test code (Lint, UT)
- iOS - set application version and build the app
- Share the IPA on CICD artifacts
- Share the IPA on Firebase/Store
- Send status message via Slack/Teams

List fo steps:

- same as [build_ios](#build_ios)
- [sourcemap_to_artifact](./steps.md#sourcemap_to_artifact)
- [deploy_generate_changelogs](./steps.md#deploy_generate_changelogs)
- [deploy_to_firebase_ios](./steps.md#deploy_to_firebase_android)
- [deploy_to_itunes](./steps.md#deploy_to_itunes)

## code_quality

Based on user choices during init/edit
This group will add steps to:
- React native - Test code (Lint, TSC, Prettier, Jest)
- Audit packages
- Send status message via Slack/Teams

List fo steps:

- [react_native_pre_build](./steps.md#react_native_pre_build)
- [npm_private_login](./steps.md#npm_private_login)
- [react_native_yarn](./steps.md#react_native_yarn)
- [react_native_lint](./steps.md#react_native_lint)
- [react_native_tsc](./steps.md#react_native_tsc)
- [react_native_prettier](./steps.md#react_native_prettier)
- [react_native_jest](./steps.md#react_native_jest)
- [audit_packages](./steps.md#audit_packages)
- [audit_export_report](./steps.md#audit_export_report)
- [audit_app_quality](./steps.md#audit_app_quality)
- [deploy_to_cicd](./steps.md#deploy_to_cicd)
- [audit_conditional_fail](./steps.md#audit_conditional_fail)
- [send_slack_message](./steps.md#send_slack_message)
- [send_teams_message](./steps.md#send_teams_message)
- [git_status_ending](./steps.md#git_status_ending)

## promote_app

Thanks to [this library](https://www.npmjs.com/package/devops-helper)

This step will promote (merge it & push) your source branch to others'

List fo steps:

- [_promote_app_step](./steps.md#promote_app_step)


## send_notification

This group will:
- send message on slack and/or teams based on user choice during init/edit

List fo steps:

- [send_slack_message](./steps.md#send_slack_message)
- [send_teams_message](./steps.md#send_teams_message)
- [git_status_ending](./steps.md#git_status_ending)