import {RequestConfig} from "@core/models";

export const RequestsConfig: RequestConfig[] = [
  {pathTemplate: '/panel/login/', method: 'POST', loading: false, success: false, failure: true, catch: false},
];
