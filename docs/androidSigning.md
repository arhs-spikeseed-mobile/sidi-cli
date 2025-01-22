# 🔑 Android Signing

## 🚀 Bitrise

For Bitrise, it quit simple, you just have to follow their explanation and add keystore on Bitrise UI directly

[Bitrise link](https://devcenter.bitrise.io/en/code-signing/android-code-signing/android-code-signing-using-the-android-sign-step.html)


## 🎨 CodeMagic

In order to use manual code signing, you have to upload your keystore on CodeMagic on their website directly.

To be able to use it during the build, we have to set keystore's reference name registered on CodeMagic side to the concerned workflow.

### ### 📖 How to Configure Android Keystore to a Workflow?

```
To do this change, you have to already initialized your config with [`sidi-cli i`](./commands.md#init)
```

📝 Steps:
- [`sidi-cli e`](./commands.md#edit)
- Select `Edit an existing Workflow`
- Select your workflow
- Select `Set android signing key..`
- Put expected keystore's reference name set on CodeMagic side
