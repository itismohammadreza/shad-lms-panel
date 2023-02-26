import {animate, AnimationTriggerMetadata, style, transition, trigger} from '@angular/animations';
import {AnimationDefinition} from "@core/models";

const FadeAnimation = [
  transition('*<=>*', [
    style({opacity: 0}),
    animate('0.6s', style({opacity: 1}))
  ]),
]

const animations: AnimationDefinition = {
  none: [],
  fade: FadeAnimation,
}

export function RouteAnimation(name: string): AnimationTriggerMetadata {
  return trigger('routeAnimation', animations[name] || animations['none']);
}
