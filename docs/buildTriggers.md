# Build triggers 

## Webhooks

Webhooks are the secret sauce behind automatic build triggering in response to events in the repository.  A webhook is basically an URL which will be called on specified events.

All received webhooks are visible in the Codemagic UI when navigating to your application and selecting the Webhooks tab.

An incoming webhook serves one purpose: to start builds automatically when a certain code event (code push, Git Tag, pull request) happens. You just need to register an incoming webhook to your repository and configure build triggers.

Once webhooks are set up, configure when to start builds automatically by defining triggers. You can set the branch of your repository that can trigger builds: for example, master or dev.

## Configure build triggers

Per default, [`sidi-cli i`](./commands.md#init) is setting the workflow's name as branch to launch himself when you will push on it (.eg if your workflow's name is SENSEI, this workflow will be triggered automatically when yo uwill push on `sensei/*` branches)

**SIDI** allows you to customize it and set different branches to listen and launch a workflow.

### How to configure Build triggers?

```
To do this change, you have to already initialized your config with [`sidi-cli i`](./commands.md#init)
```

Steps:
- [`sidi-cli e`](./commands.md#edit) 
- Select `Edit an existing Workflow`
- Select your workflow
- Select `Edit push event trigger branch pattern of this workflow`
- Put expected Build triggers for your workflow:
  - Put `NONE` if you don't want to execute this workflow based on any push event on any branches
  - Put `develop` if you want to execute this workflow on any push event on `develop` branch
  - Put `develop/*` if you want to execute this workflow on any push event on `develop/xxx` branches
  - Put `develop/*, feat/*, fix/*` if you want to execute this workflow on any push event on `develop/xxx`, `feat/xxx`, `fix/xxx` branches