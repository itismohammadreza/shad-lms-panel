import {Injectable} from '@angular/core';
import {ApiService} from "@core/http/api.service";
import {UserItem} from "@core/models";

@Injectable({
  providedIn: 'root'
})
export class DataService extends ApiService {
  constructor() {
    super()
  }

  getUsers() {
    return this._get<UserItem[]>('users').toPromise();
  }

  addUser(data: UserItem) {
    return this._post<UserItem>('add-user', data).toPromise();
  }
}
