import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {DataService} from "@core/http";
import {User} from "@core/models";

@Component({
  selector: 'ng-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent implements OnInit {
  items: MenuItem[] = [
    {
      label: 'داشبورد',
      routerLink: '/dashboard',
      routerLinkActiveOptions: 'p-menuitem-link-active'
    },
    {
      label: 'آزمون',
      routerLink: '/exam'
    },
    {
      label: 'تکالیف',
      routerLink: '/homework'
    },
    {
      label: 'درسنامه',
      routerLink: '/tutorial'
    }
  ];
  user: User;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.user = this.dataService.user;
    this.dataService.profileUpdated$.subscribe(({avatar}) => {
      this.user.avatar = avatar;
    })
  }
}
