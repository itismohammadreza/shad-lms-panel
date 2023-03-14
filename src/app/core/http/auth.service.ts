import {Injectable} from '@angular/core';
import {ApiService} from '@core/http';
import {LoginCredentials, UserProfile} from "@core/models";

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  constructor() {
    super();
  }

  login(data: LoginCredentials) {
    return this._post<{ token: string }>('login', data).toPromise().then(res => {
      localStorage.setItem('token', res.token);
      return res
    });
  }

  getProfile() {
    return this._get<UserProfile>('profile').toPromise();
  }

  editProfile(data: Exclude<UserProfile, "id">) {
    return this._post<UserProfile>('edit-profile', data).toPromise();
  }

  logout() {
    return this._get<any>('logout').toPromise().then(res => {
      localStorage.removeItem('token');
      return res
    });
  }

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
