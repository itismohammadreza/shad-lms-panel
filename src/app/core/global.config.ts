import {AppGlobalConfig} from "@core/models";
import {RouteAnimation} from "@core/animations";

export const GlobalConfig: AppGlobalConfig = {
  defaultLang: 'fa',
  rtl: true,
  defaultLabelPos: 'float',
  defaultFixLabelPos: 'fix-top',
  routeAnimation: RouteAnimation('fade')
};
