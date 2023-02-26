import {Injectable} from '@angular/core';
import {ApiService} from '@core/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  private _me: any;

  constructor(private router: Router) {
    super();
  }

  whoAmI() {
    return this._get<any>('user/whoami').toPromise();
  }

  set me(value) {
    this._me = value;
  }

  get me() {
    return this._me;
  }

  isTeacher() {
    return this.me.role == 'Teacher';
  }

  isStudent() {
    return this.me.role == 'Student';
  }

  isPrincipal() {
    return this.me.role == 'Principal';
  }

  async logout() {
    localStorage.removeItem('token');
    await this.router.navigate(['/404']);
  }
}
