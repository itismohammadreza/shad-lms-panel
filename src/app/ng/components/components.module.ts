import {CommonModule} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgPipesModule} from '@ng/pipes/pipes.module';

import {COMPONENTS} from '.';
import {NgDirectivesModule} from '../directives/directives.module';
import {PrimeNgModule} from '../prime-modules/prime-ng.module';

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS, PrimeNgModule, NgDirectivesModule, NgPipesModule],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    NgDirectivesModule,
    NgPipesModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgComponentsModule {
}
