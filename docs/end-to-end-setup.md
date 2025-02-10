
## 🛠️ **How to configure `sidi-cli` on BrowserStack**

To enable the execution of test suites on BrowserStack, the `sidi-cli` requires a properly structured `browserstack_config.json` file. This configuration file will be read by the CI/CD pipeline to set up test execution. Below is a detailed explanation of the structure and key components of this configuration file.

---
### 📁 **Structure of `browserstack_config.json`**

Below is an example snippet of a `browserstack_config.json` file:

```json
{
  "key": "default_config_sample",
  "title": "Sample config",
  "configuration": {
    "path_ios": "lib/baseConfigs/wdio.browserstack.ios.conf.js",
    "path_android": "lib/baseConfigs/wdio.browserstack.android.conf.js",
    "target_branch": "acceptance",
    "wait_for_timeout": 100000,
    "connection_retry_timeout": 300000,
    "connection_retry_count": 5,
    "max_instances": 3,
    "reports_webhook_url_teams": "https://xxx.webhook.office.com/webhookb2/xxx@xxx/IncomingWebhook/xxx/xxx/xx",
    "reports_webhook_url_slack": "https://hooks.slack.com/services/xxx/xxx/xxx",
    "execution": [
      {
        "report_name": "Report team1",
        "report_mapping_key": "*team1*",
        "specs": "['**/up.e2e.ts','**/down.e2e.ts']"
      },
      {
        "report_name": "Report team2 - feature A",
        "report_mapping_key": "*team2*",
        "specs": "['**/left.e2e.ts','**/right.e2e.ts']"
      },
      {
        "report_name": "Report team2 - feature B",
        "report_mapping_key": "*team2*",
        "specs": "['**/left-two-times.e2e.ts','**/right-two-times.e2e.ts']"
      }
    ]
  }
}
```

---

### 🧩 **Key Components of the JSON File**

#### **1. `key`**
- **Description:** A unique identifier for the configuration.
- **Purpose:** Used by the CI/CD pipeline to select the desired configuration.
- **Example:** `"key": "acceptance_p1_rules"`

#### **2. `title`**
- **Description:** A human-readable title for the configuration.
- **Purpose:** Used as a descriptive label for logs and reports.
- **Example:** `"title": "Acceptance P1"`

#### **3. `configuration`**

This section contains the details necessary to execute the test suites, including paths, environment configurations, and test-specific settings.

- **`key` and `title`:**
  - General metadata for the configuration file.
  - Example:
    ```json
    "key": "default_config_sample",
    "title": "Sample config"
    ```

- **`path_ios` and `path_android`:**
  - Paths to the WebDriverIO (WDIO) configuration files for iOS and Android.
  - Example:
    ```json
    "path_ios": "lib/baseConfigs/wdio.browserstack.ios.conf.js",
    "path_android": "lib/baseConfigs/wdio.browserstack.android.conf.js"
    ```

- **`target_branch`:**
  - The environment name used to fetch the latest builds (e.g., `acceptance`).
  - Example:
    ```json
    "target_branch": "acceptance"
    ```

- **`wait_for_timeout`:**
  - Maximum time (in milliseconds) to wait for an element.
  - Example:
    ```json
    "wait_for_timeout": 100000
    ```

- **`connection_retry_timeout`:**
  - Time (in milliseconds) to wait for connection retry.
  - Example:
    ```json
    "connection_retry_timeout": 300000
    ```

- **`connection_retry_count`:**
  - Number of connection retry attempts.
  - Example:
    ```json
    "connection_retry_count": 5
    ```

- **`max_instances`:**
  - Maximum number of parallel instances to execute.
  - Example:
    ```json
    "max_instances": 3
    ```

- **`reports_webhook_url_teams`:**
  - The webhook URL to send reports to Microsoft Teams.
  - Example:
    ```json
    "reports_webhook_url_teams": "https://xxx.webhook.office.com/webhookb2/xxx@xxx/IncomingWebhook/xxx/xxx/xx"
    ```

- **`reports_webhook_url_slack`:**
  - The webhook URL to send reports to Slack.
  - Example:
    ```json
    "reports_webhook_url_slack": "https://hooks.slack.com/services/xxx/xxx/xxx"
    ```

- **`config_backward_compatibility` (optional):**
  - Specifies the version of the app the tests are backward compatible with. This allows the current tests to run on another version of the app.
  - If not provided, the tests will only target the latest app version.
  - Example:
    ```json
    "config_backward_compatibility": "1.0.0"
    ```

- **`execution`:**
  - An array of test suite configurations.
  - Each entry includes:
    - **`report_name`:** Title for the test report.
    - **`report_mapping_key`:** A pattern to group test cases.
    - **`specs`:** Paths to the test specs to be executed.
  - Example:
    ```json
    [
      {
        "report_name": "Report team1",
        "report_mapping_key": "*team1*",
        "specs": "['**/up.e2e.ts','**/down.e2e.ts']"
      },
      {
        "report_name": "Report team2 - feature A",
        "report_mapping_key": "*team2*",
        "specs": "['**/left.e2e.ts','**/right.e2e.ts']"
      },
      {
        "report_name": "Report team2 - feature B",
        "report_mapping_key": "*team2*",
        "specs": "['**/left-two-times.e2e.ts','**/right-two-times.e2e.ts']"
      }
    ]
    ```


---

### 🔧 **How It Works in CI/CD**

1. **Selection by `key`:**
   - CI/CD reads the `browserstack_config.json` file and identifies the requested `key`.

2. **Extract `title`:**
   - The corresponding `title` is logged for better traceability.

3. **Setup with `configuration`:**
   - **Environment Configuration:**
     - Fetches the AAB/IPA file associated with the specified `target_branch`.
   - **WDIO Configuration:**
     - Configures BrowserStack using paths in `path_ios` and `path_android`.
   - **Specs Execution:**
     - Executes the test specs listed under the `specs` key in each `execution` object.

---

### ⚙️ **WDIO Configuration**

The `path_ios` and `path_android` files define WebDriverIO configurations for BrowserStack. You can create as many configuration files as needed to support different use cases, such as running tests on multiple devices, platforms, or environments simultaneously.

Below is an example of an iOS WDIO configuration file:

```javascript
const { commonBaseConfig } = require("./wdio.common.conf");

exports.config = {
  ...commonBaseConfig,
  specs: process.env.E2E_SPECS_PATTERN,
  capabilities: [
    {
      "bstack:options": {
        projectName: process.env.PROJECT_NAME,
        buildName: `${process.env.BUILD_BRANCH} (${process.env.BUILD_NUMBER})`,
        appiumVersion: process.env.APPIUM_VERSION,
        video: true,
      },
      platformName: "iOS",
      "appium:platformVersion": "16.0",
      "appium:deviceName": "iPhone 14 Pro Max",
    },
    {
      "bstack:options": {
        projectName: process.env.PROJECT_NAME,
        buildName: `${process.env.BUILD_BRANCH} (${process.env.BUILD_NUMBER})`,
        appiumVersion: process.env.APPIUM_VERSION,
        video: true,
      },
      platformName: "iOS",
      "appium:platformVersion": "15.0",
      "appium:deviceName": "iPhone 13",
    }
  ],
};
```

---

### 🔑 **Note:**
You can create separate configurations or define multiple `capabilities` in a single file for testing on various devices simultaneously. For instance, you may wish to test on:
- Different iOS devices (e.g., iPhone 14 Pro Max, iPhone 13).
- Different Android devices (e.g., Samsung Galaxy S23, Google Pixel 7).

This flexibility allows you to adapt your test execution setup to your project’s requirements effectively.
