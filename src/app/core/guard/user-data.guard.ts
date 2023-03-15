import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "@core/http";

@Injectable({
  providedIn: 'root'
})
export class UserDataGuard implements CanActivate {
  constructor(private authService: AuthService) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      const user = await this.authService.getProfile();
      this.authService.user = user;
      return true;
    } catch (e) {
      return false;
    }
  }
}
