import {RequestConfig} from "@core/models";

export const RequestsConfig: RequestConfig[] = [
  {pathTemplate: '/panel/login/', method: 'POST', loading: false, success: false, failure: true, catch: false},
  {pathTemplate: '/panel/logout/', method: 'GET', loading: true, success: true, failure: true, catch: false},
  {pathTemplate: '/panel/profile/', method: 'GET', loading: true, success: false, failure: true, catch: false},
  {pathTemplate: '/panel/edit-profile/', method: 'POST', loading: true, success: true, failure: true, catch: false},
  {pathTemplate: '/panel/add-user/', method: 'POST', loading: true, success: true, failure: true, catch: false},
  {pathTemplate: '/panel/users/', method: 'GET', loading: true, success: false, failure: true, catch: false},
];
