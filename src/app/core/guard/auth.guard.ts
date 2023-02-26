import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '@core/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const role = this.authService.me.role.toLowerCase();
    const currentUrl = state.url.toLowerCase();
    let targetUrl;

    switch (role) {
      case 'principal':
      case 'teacher':
        targetUrl = '/teacher'
        break;
      case 'student':
        targetUrl = '/student'
        break;
    }

    if (!currentUrl.includes(targetUrl)) {
      await this.router.navigateByUrl(targetUrl)
      return false
    }
    return true
  }
}
