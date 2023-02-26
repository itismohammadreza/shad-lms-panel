import {AnimationTransitionMetadata, AnimationTriggerMetadata} from "@angular/animations";
import {NgFixLabelPosition, NgLabelPosition} from "@ng/models/forms";

type RequestMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface AnimationDefinition {
  [key: string]: AnimationTransitionMetadata[]
}

export interface AppGlobalConfig {
  readonly defaultLang?: string;
  readonly rtl?: boolean;
  readonly routeAnimation: AnimationTriggerMetadata | null;
  readonly defaultLabelPos: NgLabelPosition;
  readonly defaultFixLabelPos: NgFixLabelPosition;
}

export interface RequestConfig {
  pathTemplate?: string | RegExp,
  method: RequestMethods;
  loading?: boolean,
  success?: boolean,
  failure?: boolean,
  catch?: boolean,
}
