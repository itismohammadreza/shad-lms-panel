import {Injectable} from '@angular/core';
import {ApiService} from '@core/http';
import {LoginCredentials, User} from "@core/models";
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  constructor(private router: Router) {
    super();
  }

  login(data: LoginCredentials) {
    return this._post<{ token: string }>('login', data).toPromise().then(res => {
      localStorage.setItem('token', res.token);
      return res
    });
  }

  logout() {
    return this._get<any>('logout').toPromise().then(res => {
      this.removeTokenAndNavigateToLogin();
      return res
    });
  }

  removeTokenAndNavigateToLogin() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login')
  }

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
