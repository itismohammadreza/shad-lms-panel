import {Type} from '@angular/core';
import {FilterPipe} from './filter.pipe';
import {SafePipe} from './safe.pipe';

export const PIPES: Type<any>[] = [
  SafePipe,
  FilterPipe,
];
