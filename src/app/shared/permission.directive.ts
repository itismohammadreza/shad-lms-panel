import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from "@core/http";

@Directive({
  selector: '[ngPermission]'
})
export class PermissionDirective implements OnInit {
  @Input() ngPermission: 'User' | 'Admin';

  constructor(private templateRef: TemplateRef<any>,
              private vcRef: ViewContainerRef,
              private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.user.permission != this.ngPermission) {
      this.vcRef.clear();
    } else {
      this.vcRef.createEmbeddedView(this.templateRef);
    }
  }
}
