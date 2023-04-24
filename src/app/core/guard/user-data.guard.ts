import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {DataService} from "@core/http";

@Injectable({
  providedIn: 'root'
})
export class UserDataGuard implements CanActivate {
  constructor(private dataService: DataService) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      const user = await this.dataService.getProfile();
      const avatar = await this.dataService.downloadAvatar(user.id);
      user.avatar = URL.createObjectURL(new Blob([avatar.body], {type: avatar.body.type}));
      this.dataService.user = user;
      return true;
    } catch (e) {
      return false;
    }
  }
}
