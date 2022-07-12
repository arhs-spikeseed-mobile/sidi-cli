# Steps

- [setup_app_assets](#setup_app_assets)
- [react_native_pre_build](#react_native_pre_build)
- [npm_private_login](#npm_private_login)
- [react_native_yarn](#react_native_yarn)
- [react_native_lint](#react_native_lint)
- [react_native_tsc](#react_native_tsc)
- [react_native_prettier](#react_native_prettier)
- [react_native_jest](#react_native_jest)
- [android_set_manifest_version](#android_set_manifest_version)
- [android_set_version_code_name](#android_set_version_code_name)
- [android_run_lint](#android_run_lint)
- [android_run_ut](#android_run_ut)
- [android_build_apk](#android_build_apk)
- [android_build_aab](#android_build_aab)
- [deploy_to_cicd](#deploy_to_cicd)
- [git_send_tag](#git_send_tag)
- [send_slack_message](#send_slack_message)
- [send_teams_message](#send_teams_message)
- [git_status_ending](#git_status_ending)
- [sourcemap_to_artifact](#sourcemap_to_artifact)
- [deploy_generate_changelogs](#deploy_generate_changelogs)
- [deploy_to_firebase_android](#deploy_to_firebase_android)
- [deploy_to_play_store](#deploy_to_play_store)
- [ios_setup_build_number](#ios_setup_build_number)
- [ios_setup_pod_install](#ios_setup_pod_install)
- [ios_setup_carthage_install](#ios_setup_carthage_install)
- [ios_archive](#ios_archive)
- [ios_setup_certificate_install](#ios_setup_certificate_install)
- [ios_run_ut](#ios_run_ut)
- [deploy_to_firebase_ios](#deploy_to_firebase_ios)
- [deploy_to_itunes](#deploy_to_itunes)
- [audit_packages_third_parties](#audit_packages_third_parties)
- [audit_packages_outdated](#audit_packages_outdated)
- [audit_packages_urls](#audit_packages_urls)
- [audit_packages_yarn](#audit_packages_yarn)
- [audit_export_report](#audit_export_report)
- [audit_app_decompile](#audit_app_decompile)
- [audit_app_logs](#audit_app_logs)
- [audit_app_permissions](#audit_app_permissions)
- [audit_app_sizes](#audit_app_sizes)
- [audit_conditional_fail](#audit_conditional_fail)
- [promote_app_step](#promote_app_step)

## android_build_aab

Building an Android application in AAB format

Outputs:
- apk file


| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description          | Default value      | Expected value                                 |
|---------|----------------------|--------------------|------------------------------------------------|
| TARGET_ANDROID    | Path of the module   |    android/app      |                                                |
| GRADLEW_PATH    | gradlew path         | android |                                                |
| ANDROID_BUILD_VARIANT    | Build variant's name |  |                                                |
| AAB_SPECIFIC_BUILD_VARIANT    | Build variant's name |  | Do not set it if the same as apk build variant |
| ANDROID_MODULE_NAME    | Module's name                       | :app                |                                                |
| ENV_ANDROID_APK_FILTER    | One filter per line. The Step will NOT copy the generated apk files that match this filters into the Bitrise deploy directory.<br>You can use this filter to avoid moving unalinged and/or unsigned apk files.<br>If you specify an empty filter, every APK file (selected by `apk_file_include_filter`) will be copied. |  |                                                |

Outputs:
- `APP_NAME.apk`: your APK
- `APP_NAME.aab`: your AAB

## android_build_apk

Building an Android application in APK format

Outputs:
- apk file

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description          | Default value      | Expected value |
|---------|----------------------|--------------------|----------------|
| TARGET_ANDROID    | Path of the module   |    android/app      |                |
| GRADLEW_PATH    | gradlew path         | android |                |
| ANDROID_BUILD_VARIANT    | Build variant's name |  |                |
| ANDROID_MODULE_NAME    | Module's name                       | :app                |                |
| ENV_ANDROID_APK_FILTER    | One filter per line. The Step will NOT copy the generated apk files that match this filters into the Bitrise deploy directory.<br>You can use this filter to avoid moving unalinged and/or unsigned apk files.<br>If you specify an empty filter, every APK file (selected by `apk_file_include_filter`) will be copied. |  | *optional key* |

Outputs:
- `APP_NAME.apk`: your APK

## android_run_jetify

Run jetify on the project before build it

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description                   | Default value      | Expected value                   |
|---------|-------------------------------|--------------------|----------------------------------|
| TARGET_ANDROID    | Path of the module            |    android/app      |  |

## android_run_lint

Run lint on Android code

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description                   | Default value      | Expected value                   |
|---------|-------------------------------|--------------------|----------------------------------|
| TARGET_ANDROID    | Path of the module            |    android/app      |  |
| GRADLEW_PATH    | gradlew path                  | android |  |
| ANDROID_LINT_CMD    | Gradle command to launch lint | lint |  |

## android_run_ut

Run unit tests on Android code

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description                         | Default value       | Expected value                   |
|---------|-------------------------------------|---------------------|----------------------------------|
| ANDROID_MODULE_NAME    | Module's name                       | :app                |  |
| ANDROID_UNIT_TEST_CMD    | Gradle command to launch unit tests | testReleaseUnitTest |  |

## android_set_manifest_version

Set application code and build number in the android manifest file

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description                      | Default value | Expected value                   |
|---------|-------------------------------------------------------------------|------------|----------------------------------|
| TARGET_ANDROID    | Path of the module |    android/app      |  |

## android_set_version_code_name

Set application code and build number in the gradle file

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description                      | Default value | Expected value                   |
|---------|-------------------------------------------------------------------|------------|----------------------------------|
| TARGET_ANDROID    | Path of the module |    android/app      |  |

## _audit_app_decompile

Decompile the application (Android and/or iOS) to be able to check inside in other quality steps (audit_app_logs, audit_app_permissions, audit_app_sizes)

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description            | Default value | Expected value |
|---------|------------------------|------------|----------------|
| ANDROID_ARTIFACT_URL    | Android artifact's url |    *optional key*      |                |
| IOS_ARTIFACT_URL    | iOS artifact's url     |    *optional key*      |                |
| ANDROID_APK_PATH    | Android APK path       |   *optional key*       |                |
| IOS_IPA_PATH    | iOS IPA path           |    *optional key*      |                |

## _audit_app_logs

To check if the final application (APK) contain any logs.

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description                                                                                 | Default value  | Expected value |
|---------|---------------------------------------------------------------------------------------------|----------------|----------------|
| LOG_COUNT    | the count of logs present in your app, the step will fail if it detect more than this value | 0              |                |
| FILTER_PATH    | If you have any class/dependence you know you have logs but not want to take into account   | *optional key* |                |

Outputs:
- `quality_report.json`: This step will create/update this file where you can build's informations

## _audit_app_permissions

To check how many permission is required per the application
Based on the config where we have to set current permission count, the step will fail if we have any new permission

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description                                                                                                                                              | Default value | Expected value |
|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|----------------|
| CONFIG_FILE_PATH    | You can create a config file (see bellow example) where you can set different needed data to follow up values via your git client - eg. folder/config.sh |              |                |
| CHECK_ANDROID    | Set yes if you want check Android part                                                                                                                   | no           |                |
| CHECK_IOS    | Set yes if you want check iOS part                                                                                                                       | no            |                |
| IOS_SCHEME    | If you want check iOS app, have to set its name, can be found on xcode -> General -> Display Name                                                        | 0            |                |

Config file example

config.sh
```bash
android_permission_count=10
ios_permission_count=5
```

Outputs:
- `quality_report.json`: This step will create/update this file where you can build's informations
- `list_ios_permissions.txt`: List of permission used in your final iOS application
- `list_android_permissions.txt`: List of permission used in your final Android application


## _audit_app_sizes

To check applications' size
Based on the config where we have to set current applications size, the step will fail if we have any change (if difference detected higher than `alert_threshold`'s value in config file)

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description                                                                                                                                              | Default value | Expected value |
|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|----------------|
| CONFIG_FILE_PATH    | You can create a config file (see bellow example) where you can set different needed data to follow up values via your git client - eg. folder/config.sh |              |                |
| CHECK_ANDROID    | Set yes if you want check Android part                                                                                                                   | no           |                |
| CHECK_IOS    | Set yes if you want check iOS part                                                                                                                       | no            |                |

Config file example

config.sh
```bash
android_apk_size=35
ios_ipa_size=28
alert_threshold=3
```

Outputs:
- `quality_report.json`: This step will create/update this file where you can build's informations

## audit_packages_outdated

Search outdated packages

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

## audit_packages_third_parties

To check CVE vulnerabilites in the Podfile.lock and/or gradle files


| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description                                                                                                                                              | Default value    | Expected value |
|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|----------------|
| IOS_PROJECT_ROOT   | Where your xcodeproj and/or xcworkspace exist                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `ios`            ||
| ANDROID_MODULE_NAME    | Module's name                       | :app             |                |
| GRADLEW_PATH    | gradlew path         | android          |                |
| FAIL_ON_CVSS_LEVEL    | Sepcifies what level of CVSS should trigger a build failure    | 9 *optional key* |                |

## audit_packages_urls

This step will scan the source code of the repository to extract all HTTP/HTTPS urls and execute an analyze of those HTTPS URLs with [SSLLabs](https://github.com/ssllabs/ssllabs-scan)



| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description                                                                                                                                              | Default value    | Expected value |
|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|----------------|
| SSL_LABS_SCAN    | Analyze HTTPS URLs with SSLLabs and generate a report for each domain         | no               | yes/no         |
| BLACK_LIST    | List of domains that will not be analyzed by SSLLabs         | apache.org;cloudflare.com;bintray.com;w3.org;apple-mapkit.com;apple.com;mzstatic.com;mozilla.org;github.io;github.com;youtube.com;withgoogle.com;android.com;google.com;jitpack.io;microsoft.com;firebaseio.com          |                |

## audit_packages_yarn

Audit yarn packages

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

## audit_export_report

Will export generated files generated during audit packages steps

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

## audit_conditional_fail

Based on previous audit packages steps, will generate an error if it detected any problem

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

## check_versioned_branch_step

Check if we are using versioned branches in the project

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

## deploy_generate_changelogs

Based on the latest tag pushed for the current branch,
this step will compare the difference between current and last tag and expose the changelogs.

Outputs:
- $ENV_FIREBASE_RELEASE_NOTES
- release_notes.txt

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

## deploy_to_cicd

It will share artifacts on the build page

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description                                                        | Default value | Expected value                                   |
|---------|--------------------------------------------------------------------|------------|--------------------------------------------------|
| EMAILS_TO_NOTIFY    | Mail adress to send a notification when this step will be trigered |          | email1@mail.com, email2@mail.com *optional key*  |


## deploy_to_firebase_android

It will deploy the Android application to Firebase

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description                                                                                                                                                                                                                                               | Default value | Expected value                                |
|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|-----------------------------------------------|
| FIREBASE_IOS_APP_ID    | App ID of Android application on Firebase - You can find the App ID in the Firebase console, on the General Settings page. It is something in the form of: 1:1234567890:android:0a1b2c3d4e5f67890                                                         |          ||
| DEPLOYMENT_GROUP    | Alias name - Distribute the application to a group of people define on Firebase on the DEV build                                                                                                                                                          |            |*optional key*|
| FIREBASE_TOKEN    | Firebase CI access token - You can create it by firebase login:ci on your local machine. It is something in the form of 1/a1gqPSI3r-RLgCQO47pJW7WdmqdypiJMO - ⚠️ We recommend to add it on Bitrise/CodeMagic side as a private secret to hide the content |            ||

## deploy_to_firebase_ios

It will deploy the iOS application to Firebase

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description                                                                                                                                                                               | Default value | Expected value                                |
|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|-----------------------------------------------|
| FIREBASE_IOS_APP_ID    | App ID of iOS application on Firebase - You can find the App ID in the Firebase console, on the General Settings page. It is something in the form of: 1:1234567890:ios:0a1b2c3d4e5f67890 |          ||
| DEPLOYMENT_GROUP    | Alias name - Distribute the application to a group of people define on Firebase on the DEV build                                                                                          |            |*optional key*|
| FIREBASE_TOKEN    | Firebase CI access token - You can create it by firebase login:ci on your local machine. It is something in the form of 1/a1gqPSI3r-RLgCQO47pJW7WdmqdypiJMO - ⚠️ We recommend to add it on Bitrise/CodeMagic side as a private secret to hide the content                              |            ||

## deploy_to_itunes

It will deploy the iOS application to iTunes

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description                                                                                                               | Default value | Expected value                                |
|---------|---------------------------------------------------------------------------------------------------------------------------|------------|-----------------------------------------------|
| IOS_DEPLOY_PWD    | Password for the specified Apple ID (Don't forget to select "Make it protected" when you will add this secret)            |          ||
| APPLE_APP_SPECIFIC_PASSWORD    | Apple ID: Application-specific password                                                                                   |            ||
| IOS_DEPLOY_USERNAME    | Login Apple ID for iTunes Connect (Don't forget to select "Make it protected" when you will add this secret)              |            ||
| APP_STORE_CONNECT_PRIVATE_KEY    | Contents of the API key                                                                                                   |            ||
| APP_STORE_CONNECT_KEY_IDENTIFIER    | Alphanumeric value that identifies the API key                                                                            |            ||
| APP_STORE_CONNECT_ISSUER_ID    | Alphanumeric value that identifies who created the API key                                                                |            ||
| TESTFLIGHT_GROUP_NAME    | Specify the names of beta tester groups that will get access to the build once it has passed beta review (one group only) |            |*optional key*|

## deploy_to_play_store

It will deploy the Android application to PlayStore

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description                                                         | Default value | Expected value                                |
|---------|---------------------------------------------------------------------|------------|-----------------------------------------------|
| ANDROID_PACKAGE_NAME    | Package name of the APK or App bundle to deploy                                         |          ||
| SERVICE_ACCOUNT_PATH    | Path to the Service Account's JSON key file eg: https://URL/TO/key.json or file://PATH/TO/key.json (See bellow to see how create it) |            ||
| GCLOUD_SERVICE_ACCOUNT_CREDENTIALS    | Contents of the JSON key file for Google Play service account saved as a secure environment variable |            ||

## get_variables_from_file

To get variables from an external file and save them as environment variable to use it as we want anywhere.

| CICD    | Available          |
|---------|--------------------|
| Bitrise | :x:                |
| Codemagic| :white_check_mark: |

## git_send_tag

Send tag when the build success.
Tag architecture:
```
$WORKFLOW--$APP_VERSION($PROJECT_BUILD_NUMBER)
```

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

## git_ssh_and_clone

It will set the ssh and clone the project.
Codemegic doing it per default

| CICD    | Available          |
|---------|--------------------|
| Bitrise | :white_check_mark: |
| Codemagic| :x:                |

## git_status_beginning

Send `Start` event to gitlab pipelines

| CICD    | Available          |
|---------|--------------------|
| Bitrise | :white_check_mark: |
| Codemagic| :x:                |

| Variable | Description                                                         | Default value | Expected value                                |
|---------|---------------------------------------------------------------------|--------------|-----------------------------------------------|
| GITLAB_TOKEN    | Gitlab token to use the API                                         |          ||
| GITLAB_STATUS_URL    | Gitlab status url (needed if build is managed by a Gitlab pipeline) |     https://gitlab.com/api/v4         ||
| BITRISE_BUILD_CONTEXT    | Build name displayed on GitLab                                      |      BitriseFullBuild        ||

## git_status_ending

Send `End` event to gitlab pipelines

| CICD    | Available          |
|---------|--------------------|
| Bitrise | :white_check_mark: |
| Codemagic| :x:                |

| Variable | Description                                                         | Default value | Expected value                                |
|---------|---------------------------------------------------------------------|--------------|-----------------------------------------------|
| GITLAB_TOKEN    | Gitlab token to use the API                                         |          ||
| GITLAB_STATUS_URL    | Gitlab status url (needed if build is managed by a Gitlab pipeline) |     https://gitlab.com/api/v4         ||
| BITRISE_BUILD_CONTEXT    | Build name displayed on GitLab                                      |      BitriseFullBuild        ||

## ios_archive

Building the iOS archive and expose in IPA format

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Default value | Expected value                                |
|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------|
| IOS_PROJECT_ROOT   | Where your xcodeproj and/or xcworkspace exist                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `ios`         ||
| IOS_PROJECT_FILE_NAME   | iOS profect file name (without .extension)                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |               ||
| IOS_SCHEME   | The Scheme have to be marked as shared in Xcode                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |               ||
| IOS_EXPORT_ALL_DSYM   | To export all Dsyms from the current build                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | no            | yes/no                                        |
| BUNDLE_ID    | iOS applicatioon's bundle id for selected scheme/workflows                                                                                                                                                                                                                                                                                                                                                                                                                                                         | no            | yes/no                                        |
| IOS_COMPILE_BITCODE   | To compile the BITCODE version of the app. More info about [BITCODE](https://www.infoq.com/articles/ios-9-bitcode)                                                                                                                                                                                                                                                                                                                                                                                                 | yes           | yes/no                                        |
| IOS_UPLOAD_BITCODE   | To upload the BITCODE version of the app. More info about [BITCODE](https://www.infoq.com/articles/ios-9-bitcode)      yes                                                                                                                                                                                                                                                                                                                                                                                         |               | yes/no                                        |
| IOS_EXPORT_METHOD   | Certificate / provisioning profile used to build based on the provisioning profile embedded in the .xcarchive (*which is generated by the xcodebuild archive command, also performed by the Xcode Archive step, right before the xcodebuild -exportArchive command*).<br/><br/>*The embedded provisioning profile depends on your code sign settings in your project. You can force the desired code signing configuration with Xcode Archive step's force_code_sign_identity and force_ provisioning_profile inputs. |     development          | ad_hoc/app_store/development/enterprise |

Outputs:
- `APP_NAME.ipa`: your IPA

## ios_setup_certificate_install

Install certificate which will be used to build the archive

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

How to add them to codemagic/bitrise:

Bitrise: 

URL: https://devcenter.bitrise.io/en/code-signing/ios-code-signing/managing-ios-code-signing-files---automatic-provisioning.html

CodeMagic

URL: https://docs.codemagic.io/yaml-code-signing/signing-ios/#manual-code-signing

SIDI generate a yaml which allow you to install multiple profiles/certificates.

To do that, you have to follow the link just below and create keys as explained and add at the end of each key the workflow's name

.eg
CM_CERTIFICATE_DEV

CM_CERTIFICATE_DEV2

CM_CERTIFICATE_DEV_PASSWORD

CM_CERTIFICATE_DEV2_PASSWORD

CM_PROVISIONING_PROFILE_DEV

CM_PROVISIONING_PROFILE_DEV2


## ios_run_ut

Run iOS unit tests

| CICD    | Available          |
|---------|--------------------|
| Bitrise | :white_check_mark: |
| Codemagic| :x:                |

| Variable | Description                                     | Default value                      | Expected value |
|---------|-------------------------------------------------|------------------------------------|----------------|
| IOS_PROJECT_ROOT    | Where your xcodeproj and/or xcworkspace exist   | `ios` ||
| IOS_PROJECT_FILE_NAME    | iOS profect file name (without .extension)      |  ||
| IOS_TEST_SCHEME_NAME    | The Scheme have to be marked as shared in Xcode |  ||
| IOS_TEST_OS    | Os to use with the device                       | 14.3 ||
| IOS_TEST_GENERATE_COVERAGE    | To generate or not a coverage file              |  | yes/no         |
| IOS_TEST_DEVICE    | Test device which will be used                  | iPhone 12 ||

## ios_setup_build_number

Set application code and build number

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description              | Default value                       | Expected value |
|---------|--------------------------|-------------------------------------|----------------|
| IOS_PROJECT_ROOT    | Where your xcodeproj and/or xcworkspace exist | `ios` ||
| IOS_PLIST_PATH    | Where your podfile exist |  ||

## ios_setup_carthage_install

Install carthage dependencies

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description              | Default value                       | Expected value |
|---------|--------------------------|-------------------------------------|----------------|
| IOS_PROJECT_ROOT    | Where your xcodeproj and/or xcworkspace exist | `ios` ||
| IOS_PLIST_PATH    | Where your podfile exist |  ||

## _ios_setup_plist_value

To change a value of a key present in a plist file

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description                 | Default value                       | Expected value |
|---------|-----------------------------|-------------------------------------|----------------|
|  IOS_PLIST_PATH   | Path to the Info.plist file |  ||
|  PLIST_KEY   | Key to replace              |  ||
|  PLIST_VALUE   | Value to set                |  ||

## ios_setup_pod_install

Install pod dependencies

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description              | Default value                        | Expected value                      |
|---------|--------------------------|--------------------------------------|---|
| IOS_PROJECT_ROOT    | Where your xcodeproj and/or xcworkspace exist | `ios` ||

## npm_private_login

To register and be able to install private npm packages

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description        | Default value                        | Expected value                      |
|---------|--------------------|--------------------------------------|---|
| NPM_TOKEN    | Npm token to login |  ||

## react_native_jest
Run unit tests on React-Native codes

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

## react_native_lint

Run lint on React-Native codes

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

## react_native_pre_build

Install React-Native cli

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description                | Default value                        | Expected value                                      |
|---------|----------------------------|--------------------------------------|-----------------------------------------------------|
| RN_CLI_VERSION    | React native cli's version | latest | *optional key - will use latest version if not set* |

## react_native_prettier

Run prettier on React-Native codes

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

## react_native_tsc

Run tsc on React-Native codes

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

## react_native_yarn

Install yarn

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

## send_slack_message

Send the build on Slack

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description                        | Default value | Expected value                      |
|---------|------------------------------------|---------------|---|
| SLACK_WEBHOOCKS    | Url of the webhook on Slack's side |               ||
| CHANNEL_NAME        | Channel name on Slack              |               ||

## send_teams_message

Send the build on Teams

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

| Variable | Description                              | Default value | Expected value                      |
|---------|------------------------------------------|---------------|---|
| TEAMS_BUILDS_WEBHOOCKS      | Url of the webhook on Team's side        |               ||
| CODE_MAGIC_TOKEN<sup> codemagic only</sup>       | CodeMagic token, to check build's status |               ||

## setup_app_assets

This step will add an icon or text, on the left and/or right bottom side of the source image
More info: https://github.com/imranMnts/bitrise-step-image-overlayer

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

Variables

| Variable                                                 | Description                                                                                                                                                                              | Default value | Expected value |
|----------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|----------------|
| IMAGE_OVERLAYER_SOURCE_IMAGE                             | Source image or folder path - in fodler case, we can put a list of folder, just split folders with ,                                                                                     |               ||
| IMAGE_OVERLAYER_LEFT_ICON                                | Left icon's path or text to display on left side                                                                                                                                         |               | *optional key* |
| IMAGE_OVERLAYER_RIGHT_ICON                               | Right icon's path or text to display on right side                                                                                                                                       |               | *optional key* |
| IMAGE_OVERLAYER_TEXT_COLOR                               | If you put a text for IMAGE_OVERLAYER_LEFT_ICON and/or IMAGE_OVERLAYER_RIGHT_ICON, this key will set the color to use                                                                    | #FFFFFF       | *optional key* |
| IMAGE_OVERLAYER_CENTER_IMAGE                             | To put icons/texts at the mdidle of the source icon                                                                                                                                      | true          | true/false     |
| IMAGE_OVERLAYER_EXPORT_RESULT                            | If yo uwant export result in artifacts                                                                                                                                                   | true          |true/false|
| IMAGE_OVERLAYER_ARCHIVE_RESULT                           | If you want compress exported files                                                                                                                                                      | true          |true/false|
| IMAGE_OVERLAYER_PATH_GENERATOR<sup> codemagic only</sup> | Path of the file used to do the change on the image. Copy past them (`Arial-Bold.ttf` & `generator.py3`) in your project if you want to be able to use this feature (Only for Codemagic) |               ||

## sourcemap_to_artifact

To export the sourcemap to artifacts, and be able to download and debug a crash in production.

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

## promote_app_step

To promote (merge it & push) your source branch (first branch of BRANCH_LIST) to others'

| CICD    | Available         |
|---------|-------------------|
| Bitrise | :white_check_mark:|
| Codemagic|:white_check_mark:|

Variables

| Variable                                                 | Description                                                                                                                                      | Default value | Expected value                           |
|----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|--------------|------------------------------------------|
| REPOSITORY_URL                             | You have to set your repository url with the ci-token [More info](https://docs.gitlab.com/ee/ci/jobs/ci_job_token.html)                          |              ||
| BRANCHES                                | Your branch list, to know which branch have to be merged into which - Should be a valid json array                                               |              | [\"branch_1\",\"branch_2\",\"branch_3\"] |
| APP_VERSION                               | App version - optional key if you're using versioned branch                                                                                      |              | Your version (eg. 2.1.1)                 |
| IS_VERSIONED_BRANCH        | This step automatically checking the version in branch name, to turn it off, set this key to false and the step will only merge branch set into `BRANCHES` |        | true/false                               |

    
    
    
    
    
    
    