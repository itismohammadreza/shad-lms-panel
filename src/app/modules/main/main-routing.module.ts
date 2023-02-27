import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainPage} from './main.page';
import {DashboardPage} from "@modules/main/pages/dashboard/dashboard.page";
import {ExamPage} from "@modules/main/pages/exam/exam.page";
import {HomeworkPage} from "@modules/main/pages/homework/homework.page";
import {TutorialPage} from "@modules/main/pages/tutorial/tutorial.page";

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'dashboard',
        component: DashboardPage,
        title: 'داشبورد'
      },
      {
        path: 'exam',
        component: ExamPage,
        title: 'داشبورد'
      },
      {
        path: 'homework',
        component: HomeworkPage,
        title: 'تکالیف'
      },
      {
        path: 'tutorial',
        component: TutorialPage,
        title: 'درسنامه'
      },
      {
        path: '',
        redirectTo: 'dashboard',
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
