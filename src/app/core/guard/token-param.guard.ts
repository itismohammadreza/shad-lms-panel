import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '@core/http';

@Injectable({
  providedIn: 'root'
})
export class TokenParamGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const token = next.queryParamMap.get('token') || localStorage.getItem('token');
    localStorage.setItem('token', token);
    try {
      this.authService.me = await this.authService.whoAmI();
      return true;
    } catch (e) {
      return false
    }
  }
}
