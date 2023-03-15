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

  getUsers(sort: string[] = null) {
    return this._post<User[]>('users', {sort}).toPromise();
  }

  addUser(data: User) {
    return this._post<{ user: User }>('add-user', data).toPromise();
  }

  editProfile(data: User) {
    return this._post<User>('edit-profile', data).toPromise();
  }

  getObjectsDetail(type: 'Exam' | 'Homework' | 'Tutorial', filter?: any) {
    return this._post<User>('dashboard-objects-detail', {type, ...filter}).toPromise();
  }
}
