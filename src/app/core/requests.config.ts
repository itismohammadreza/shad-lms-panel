import {RequestConfig} from "@core/models";

export const RequestsConfig: RequestConfig[] = [
  {pathTemplate: '/panel/login/', method: 'POST', loading: false, success: false, failure: true, catch: false},
  {pathTemplate: '/panel/logout/', method: 'GET', loading: true, success: true, failure: true, catch: false},
  {pathTemplate: '/panel/profile/', method: 'GET', loading: true, success: false, failure: true, catch: false},
  {pathTemplate: '/panel/profile/', method: 'PUT', loading: true, success: true, failure: true, catch: false},
  {pathTemplate: '/panel/avatar/*', method: 'GET', loading: true, success: false, failure: false, catch: false},
  {pathTemplate: '/panel/avatar/*', method: 'POST', loading: true, success: true, failure: true, catch: false},
  {pathTemplate: '/panel/users/', method: 'POST', loading: true, success: true, failure: true, catch: false},
  {pathTemplate: '/panel/users/', method: 'GET', loading: true, success: false, failure: true, catch: false},
  {pathTemplate: '/panel/dashboard-objects-detail/', method: 'POST', loading: true, success: false, failure: true, catch: false},
  {pathTemplate: '/panel/object-count-per-grade/*', method: 'GET', loading: true, success: false, failure: true, catch: false},
  {pathTemplate: '/panel/lms-usage/', method: 'GET', loading: true, success: false, failure: true, catch: false},
  {pathTemplate: '/panel/count-bar/', method: 'GET', loading: true, success: false, failure: true, catch: false},
  {pathTemplate: '/panel/exam-count-page/', method: 'GET', loading: true, success: false, failure: true, catch: false},
  {pathTemplate: '/panel/homework-count-page/', method: 'GET', loading: true, success: false, failure: true, catch: false},
  {pathTemplate: '/panel/tutorial-count-page/', method: 'GET', loading: true, success: false, failure: true, catch: false},
  {pathTemplate: '/panel/provinces/*', method: 'GET', loading: true, success: false, failure: true, catch: true},
  {pathTemplate: '/panel/districts/*', method: 'GET', loading: false, success: false, failure: true, catch: false},
  {pathTemplate: '/panel/grades/*', method: 'GET', loading: true, success: false, failure: true, catch: true},
  {pathTemplate: '/panel/fields/', method: 'GET', loading: true, success: false, failure: true, catch: true},
  {pathTemplate: '/panel/schools/', method: 'GET', loading: false, success: false, failure: true, catch: false},
];
