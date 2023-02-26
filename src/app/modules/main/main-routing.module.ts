import {RouterModule, Routes} from '@angular/router';
import {NgModule, Type} from '@angular/core';
import {MainPage} from './main.page';
import {AuthGuard} from "@core/guard";
import {DashboardPage} from "@modules/main/pages/dashboard/dashboard.page";

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: '',
        component: DashboardPage,
        title: 'داشبورد'
      },
      {
        path: '',
        redirectTo: '',
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
