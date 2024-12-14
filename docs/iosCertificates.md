
# 📱 iOS Certificates and Profiles

## 🍏 Bitrise

For Bitrise, the process is quite simple. Just follow their documentation to add certificates and profiles directly via the Bitrise UI.

🔗 [Bitrise Documentation](https://devcenter.bitrise.io/en/code-signing/ios-code-signing/managing-ios-code-signing-files---automatic-provisioning.html#:~:text=To%20use%20this%20feature%2C%20you,automatically%20managing%20code%20signing%20assets.)

---

## 🛠️ CodeMagic

To use manual code signing in Codemagic, you’ll need the following:

- **🔐 Signing Certificate**: Your development or distribution certificate in `.P12` format.
- **🔑 Certificate Password**: If your certificate is password-protected, provide the password.
- **📄 Provisioning Profile**: Export it from **Certificates, Identifiers & Profiles** under the "Profiles" section and download it.

### 💾 Save Certificates and Profiles in Environment Variables

1. Open your app in Codemagic.
2. Navigate to the **Environment Variables** section.
3. Add the required environment variables with their corresponding values.
4. Create a group and name it **default**.

⚠️ **Important:** Binary files (e.g., `.p12` certificates and provisioning profiles) must be base64 encoded before being saved as environment variables. They are then decoded during the build process.

#### 🔄 How to Base64 Encode Your Files
```bash
cat your_file_name.extension | base64 | pbcopy
```

---

### ✅ Expected Variables

| 🏷️ Variable Name                               | 📥 Value Description               | 📂 Group   |
|------------------------------------------------|-------------------------------------|------------|
| CM_CERTIFICATE_**WORKFLOWNAME**                | Signing certificate in base64      | default    |
| CM_CERTIFICATE_PASSWORD_**WORKFLOWNAME**       | Certificate password (if any)      | default    |
| CM_PROVISIONING_PROFILE_**WORKFLOWNAME**       | Provisioning profile in base64     | default    |

---

### 📋 Example

Consider two workflows: **KAWAII** and **SENSEI**. In this case:
- **KAWAII** uses a password-protected certificate.
- **SENSEI** does not require a password.

Here’s the list of variables to create:

| 🏷️ Variable Name                        | 📥 Value (base64-encoded)          | 📂 Group   |
|----------------------------------------|-------------------------------------|------------|
| CM_CERTIFICATE_KAWAII                  | MIK06AYJKoZI...                    | default    |
| CM_CERTIFICATE_PASSWORD_KAWAII         | password                           | default    |
| CM_PROVISIONING_PROFILE_KAWAII         | MIIMNwIBAzCCC...                   | default    |
|----------------------------------------|-------------------------------------|------------|
| CM_CERTIFICATE_SENSEI                  | MIK06AYJKoZI...                    | default    |
| CM_PROVISIONING_PROFILE_SENSEI         | MIIMNwIBAzCCC...                   | default    |

---

🎉 By following these steps, you’ll have your iOS certificates and profiles configured and ready for use in Codemagic!
