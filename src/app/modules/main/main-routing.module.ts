import {RouterModule, Routes} from '@angular/router';
import {NgModule, Type} from '@angular/core';
import {MainPage} from './main.page';
import {AuthGuard} from "@core/guard";

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [

      {
        path: '',
        redirectTo: 'teacher',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '/404'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {
}
