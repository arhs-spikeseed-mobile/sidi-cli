# Build Triggers

## Webhooks

Webhooks are the key mechanism for triggering automatic builds in response to repository events. A webhook is essentially a URL that is called upon specified events.

All received webhooks are visible in the Codemagic UI under the **Webhooks** tab of your application.

The primary purpose of an incoming webhook is to trigger builds automatically based on specific code events, such as code pushes, Git tags, or pull requests. To enable this, you need to register the webhook with your repository and configure the appropriate build triggers.

After setting up webhooks, you can define the conditions for triggering builds automatically. This includes specifying which repository branches, such as `master` or `dev`, should initiate the builds.

## Configuring Build Triggers

By default, [`sidi-cli i`](./commands.md#init) initializes the workflow to trigger on specific branches. For instance, if your workflow is named **SENSEI**, it will automatically trigger on push events to branches matching `sensei/*`.

The **SIDI** CLI also allows customization, enabling you to specify different branches for triggering workflows.

### How to Configure Build Triggers?

Before proceeding, ensure you have already initialized your configuration using [`sidi-cli i`](./commands.md#init).

#### Steps:

1. Run [`sidi-cli e`](./commands.md#edit).
2. Select **Edit an existing Workflow**.
3. Choose your workflow from the list.
4. Select **Edit push event trigger branch pattern of this workflow**.
5. Define the desired build triggers for your workflow:
   - Use `NONE` to disable automatic triggering for any branch.
   - Use `develop` to trigger the workflow on push events to the `develop` branch.
   - Use `develop/*` to trigger the workflow on push events to branches like `develop/xxx`.
   - Use `develop/*, feat/*, fix/*` to trigger the workflow on push events to branches like `develop/xxx`, `feat/xxx`, or `fix/xxx`.
