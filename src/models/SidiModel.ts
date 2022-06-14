import { GluegunToolbox } from 'gluegun';
import { WorkflowConfig } from '../main/WorkflowConfig';

export interface IStep {
  [stepName: string]: any;
}

export interface ISidiMode {
  mode: 'init' | 'update' | 'edit';
  workflowName?: string;
}

export interface IBitriseWorkflow {
  after_run?: string[];
  envs?: IEnv[];
  meta?: any;
}

export interface ICodeMagicWorkflow {
  name?: string;
  max_build_duration?: number;
  instance_type?: string;
  triggering?: {
    events: Array<string>;
    cancel_previous_builds: boolean;
    branch_patterns: any[];
  };
  artifacts?: Array<string>;
  publishing?: {
    firebase?: {
      firebase_token: string;
      ios?: {
        app_id: string;
      };
      android?: {
        app_id: string;
        artifact_type?: string;
      };
    };
    slack?: {
      channel: string;
      notify_on_build_start: boolean;
      notify: {
        success: boolean;
        failure: boolean;
      };
    };
    scripts?: any;
  };
  environment?: {
    xcode: number;
    node: number;
    ios_signing?: any;
    android_signing?: string[];
    groups: Array<string>;
    vars: { [key: string]: string };
  };
  scripts?: Array<string>;
}

export interface IConfig {
  mandatoryKeys: IKey[];
  conditionalSteps?: IConditionalStep[];
  stepsFamily?: string[];
  artifacts?: string[];
  checks?: ICheck[];
  replaceIfDuplicate?: boolean;
  codemagicSpecialCase?: ICodeMagicSpecialCase;
}

export interface ICodeMagicSpecialCase {
  platform?: 'ios' | 'android';
  stepName: string;
}

export interface IEnv {
  [workflowName: string]: string;
}

export interface IConditionalStep {
  conditions: ICondition[];
  stepsNames: string[];
}

export interface ICheck {
  conditions: ICondition[];
  check: (toolbox: GluegunToolbox) => Promise<boolean> | boolean;
}

export interface ICondition {
  key: string;
  expectedValues: string[];
  choices?: string[];
}

export interface IKey {
  key: string;
  globalValue?: boolean;
  defaultValue?: string;
}

export interface ICustomSteps {
  stepName: string;
  nextStepName?: string;
}

export interface IPreparedSteps {
  secretFileEnvs: IEnv[];
  bitriseSteps: IStep;
  codemagicSteps: IStep[];
  workflowConfigs: { [key: string]: WorkflowConfig };
}

export interface IPrintableStep {
  id: number;
  name: string;
}
