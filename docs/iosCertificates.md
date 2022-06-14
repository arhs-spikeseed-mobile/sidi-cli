# iOS certificates and profiles

## Bitrise

For Bitrise, it quit simple, you just have to follow their explanation and add certificates/profiles on Bitrise UI directly

[Bitrise link](https://devcenter.bitrise.io/en/code-signing/ios-code-signing/managing-ios-code-signing-files---automatic-provisioning.html#:~:text=To%20use%20this%20feature%2C%20you,automatically%20managing%20code%20signing%20assets.)


## CodeMagic

In order to use manual code signing, you need the following values:

- **Signing certificate**: Your development or distribution certificate in .P12 format.
- **Certificate password** (only if your certificate is password-protected): The certificate password if the certificate is password-protected. 
- **Provisioning profile**: You can get it from Certificates, Identifiers & Profiles > Profiles and select the provisioning profile you would like to export and download.

Save them in Environment variables for **all** envionment/workflow:

- Go to Codemagic and open your app.
- Under the Environment variables section, add the environment variables with their corresponding value.
- Create a group and name it `default`

⚠️ The binary files (i.e. provisioning profiles & .p12 certificate) have to be base64 encoded locally before they can be saved to Environment variables and decoded during the build.

#### How to get binary format of a certificate/profile?
```
cat your_file_name.extension | base64 | pbcopy
```

### Expected variables

| Variable name                            | Variable value                    | Group   |
|------------------------------------------|-----------------------------------|---------|
| CM_CERTIFICATE_**WORFKLOWNAME**          | Put your signing certificate here | default |
| CM_CERTIFICATE_PASSWORD_**WORFKLOWNAME** | Put the certificate password here if it is password-protected | default |
| CM_PROVISIONING_PROFILE_**WORFKLOWNAME**                | Put your provisioning profile here | default |


### Example

We have two workflows, named **KAWAII** and **SENSEI**, where you want to archive and export an iOS application during the build.

In our scenario, KAWAII workflow is using a certificate password-protected and SENSEI not.

In that case we have to create 5 variables (3 for KAWAII, 2 for SENSEI)

List of variable to create

| Variable name                        | Variable value  | Group   |
|--------------------------------------|-----------------|---------|
| CM_CERTIFICATE_KAWAII        | MIK06AYJKoZI... | default |
| CM_CERTIFICATE_PASSWORD_KAWAII | password        | default |
| CM_PROVISIONING_PROFILE_KAWAII    | MIIMNwIBAzCCC... | default |
|--------------------------------------|-----------------|---------|
| CM_CERTIFICATE_SENSEI        | MIK06AYJKoZI... | default |
| CM_PROVISIONING_PROFILE_SENSEI    | MIIMNwIBAzCCC... | default |

