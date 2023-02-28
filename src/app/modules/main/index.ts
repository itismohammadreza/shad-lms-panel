import {Type} from '@angular/core';
import {MainPage} from "@modules/main/main.page";
import {NavbarMenuComponent} from "@modules/main/components/navbar-menu/navbar-menu.component";
import {DashboardPage} from "@modules/main/pages/dashboard/dashboard.page";
import {ExamPage} from "@modules/main/pages/exam/exam.page";
import {HomeworkPage} from "@modules/main/pages/homework/homework.page";
import {TutorialPage} from "@modules/main/pages/tutorial/tutorial.page";
import {FigureComponent} from "@modules/main/components/figure/figure.component";

export const COMPONENTS: Type<any>[] = [
  NavbarMenuComponent,
  FigureComponent,
  MainPage,
  DashboardPage,
  ExamPage,
  HomeworkPage,
  TutorialPage
];
