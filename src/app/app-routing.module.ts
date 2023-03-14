import {NgModule, Type} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StatusComponent} from "@ng/components/status/status.component";
import {AuthGuard} from "@core/guard";

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: (): Promise<Type<any>> =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    // canLoad: [PagesGuard],
  },
  {
    path: '',
    loadChildren: (): Promise<Type<any>> =>
      import('@modules/main/main.module').then((m) => m.MainModule),
    canLoad: [AuthGuard],
  },
  {
    path: '404',
    component: StatusComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      useHash: true
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
