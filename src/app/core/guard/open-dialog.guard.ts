import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot} from '@angular/router';
import {OverlayService} from "@ng/services";
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class OpenDialogGuard implements CanDeactivate<any> {
  constructor(private overlayService: OverlayService,) {
  }

  async canDeactivate(component: any,
                      currentRoute: ActivatedRouteSnapshot,
                      currentState: RouterStateSnapshot,
                      nextState?: RouterStateSnapshot): Promise<boolean> {
    await this.overlayService.closeAnyOpenDialog();
    return true;
  }
}
