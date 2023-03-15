import {Injectable} from '@angular/core';
import {ApiService} from '@core/http';
import {LoginCredentials, User} from "@core/models";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  constructor(private router: Router) {
    super();
  }

  private _user: User;

  set user(user: User) {
    this._user = user;
  }

  get user() {
    return this._user;
  }

  login(data: LoginCredentials) {
    return this._post<{ token: string }>('login', data).toPromise().then(res => {
      localStorage.setItem('token', res.token);
      return res
    });
  }

  getProfile() {
    return this._get<User>('profile').toPromise();
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
