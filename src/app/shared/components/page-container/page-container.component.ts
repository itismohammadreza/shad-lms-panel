import {AfterContentInit, Component, ContentChildren, Input, QueryList, TemplateRef} from '@angular/core';
import {TemplateDirective} from "@ng/directives/template.directive";
import {Params, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'ng-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss']
})
export class PageContainerComponent implements AfterContentInit {
  @Input() title: string;
  @Input() backRoute: string | string[];
  @Input() backRouteQuery: Params;
  @Input() bgColor: string;
  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  toolbarRightTemplate: TemplateRef<any>;
  toolbarCenterTemplate: TemplateRef<any>;
  toolbarLeftTemplate: TemplateRef<any>;
  footerTemplate: TemplateRef<any>;

  constructor(private router: Router, private location: Location) {
  }

  ngAfterContentInit() {
    this.templates.forEach((item: TemplateDirective) => {
      switch (item.getType()) {
        case 'toolbar-right':
          this.toolbarRightTemplate = item.templateRef;
          break;

        case 'toolbar-left':
          this.toolbarLeftTemplate = item.templateRef;
          break;

        case 'toolbar-center':
          this.toolbarCenterTemplate = item.templateRef;
          break;

        case 'footer':
          this.footerTemplate = item.templateRef;
          break;
      }
    });
  }

  navigate() {
    if (this.backRoute != '#') {
      if (Array.isArray(this.backRoute)) {
        this.router.navigate(this.backRoute, {queryParams: this.backRouteQuery})
      } else {
        this.router.navigate([this.backRoute], {queryParams: this.backRouteQuery})
      }
    } else {
      this.location.back()
    }
  }
}
