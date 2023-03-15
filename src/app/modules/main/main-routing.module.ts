import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainPage} from './main.page';
import {DashboardPage} from "@modules/main/pages/dashboard/dashboard.page";
import {ExamPage} from "@modules/main/pages/exam/exam.page";
import {HomeworkPage} from "@modules/main/pages/homework/homework.page";
import {TutorialPage} from "@modules/main/pages/tutorial/tutorial.page";
import {ProfilePage} from "@modules/main/pages/profile/profile.page";
import {ProfileEditPage} from "@modules/main/pages/profile-edit/profile-edit.page";
import {UsersPage} from "@modules/main/pages/users/users.page";
import {UserDataGuard} from "@core/guard/user-data.guard";

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    canActivate: [UserDataGuard],
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
        path: 'profile',
        component: ProfilePage,
        title: 'پروفایل'
      },
      {
        path: 'profile-edit',
        component: ProfileEditPage,
        title: 'ویرایش پروفایل'
      },
      {
        path: 'users',
        component: UsersPage,
        title: 'مدیریت کاربران'
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
