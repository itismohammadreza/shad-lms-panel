import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {DataService} from "@core/http";

@Directive({
  selector: '[ngPermission]'
})
export class PermissionDirective implements OnInit {
  @Input() ngPermission: 'User' | 'Admin';

  constructor(private templateRef: TemplateRef<any>,
              private vcRef: ViewContainerRef,
              private dataService: DataService) {
  }

  ngOnInit() {
    if (this.dataService.user.permission != this.ngPermission) {
      this.vcRef.clear();
    } else {
      this.vcRef.createEmbeddedView(this.templateRef);
    }
  }
}
