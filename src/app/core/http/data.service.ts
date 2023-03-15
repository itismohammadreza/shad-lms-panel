import {Injectable} from '@angular/core';
import {ApiService} from "@core/http/api.service";
import {User} from "@core/models";

@Injectable({
  providedIn: 'root'
})
export class DataService extends ApiService {
  constructor() {
    super()
  }

  getUsers() {
    return this._get<User[]>('users').toPromise();
  }

  addUser(data: User) {
    return this._post<{ user: User }>('add-user', data).toPromise();
  }

  editProfile(data: User) {
    return this._post<User>('edit-profile', data).toPromise();
  }
}
