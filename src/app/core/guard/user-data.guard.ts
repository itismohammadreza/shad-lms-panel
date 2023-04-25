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
      this.dataService.user = user;
      const avatar = await this.dataService.downloadAvatar(user.id);
      this.dataService.user.avatar = URL.createObjectURL(new Blob([avatar.body], {type: avatar.body.type}));
      return true;
    } catch (e) {
      if (e.status == 409) {
        this.dataService.user.avatar = 'assets/images/avatar.png';
        return true;
      }
    }
  }
}
