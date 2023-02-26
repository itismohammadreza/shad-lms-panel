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

  login(data: any) {
    return this._get<any>('user/whoami').toPromise();
  }

  register(data: any) {
    return this._get<any>('user/whoami').toPromise();
  }

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  async logout() {
    localStorage.removeItem('token');
    await this.router.navigate(['/404']);
  }
}
