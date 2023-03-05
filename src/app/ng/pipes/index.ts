import {Type} from '@angular/core';
import {FilterPipe} from './filter.pipe';
import {SafePipe} from './safe.pipe';
import {WithCommaPipe} from "@ng/pipes/with-comma.pipe";

export const PIPES: Type<any>[] = [
  SafePipe,
  FilterPipe,
  WithCommaPipe
];
