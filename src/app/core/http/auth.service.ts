import {Injectable} from '@angular/core';
import {ApiService} from '@core/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  constructor() {
    super();
  }

  login(data: any) {
    return this._post<any>('login', data).toPromise();
  }

  register(data: any) {
    return this._get<any>('user/whoami').toPromise();
  }

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
