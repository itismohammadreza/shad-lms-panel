import {Component, Input, OnInit} from '@angular/core';
import {LanguageChecker} from '@core/utils';

@Component({
  selector: 'ng-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent extends LanguageChecker implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }
}
