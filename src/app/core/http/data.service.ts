import {Injectable} from '@angular/core';
import {ApiService} from "@core/http/api.service";
import {CountBar, CountBarFilter, EntityType, GradeCount, Usage, UsageFilter, User} from "@core/models";

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

  getObjectsDetail(type: EntityType) {
    return this._post<User>('dashboard-objects-detail', {type}).toPromise();
  }

  getGradeCount(type: EntityType) {
    return this._post<GradeCount>('object-count-per-grade', {type}).toPromise();
  }

  getUsage(filter?: UsageFilter) {
    return this._get<Usage>('lms-usage', {params: {...filter}}).toPromise();
  }

  getCountBar(filter?: CountBarFilter) {
    return this._get<CountBar>('count-bar', {params: {...filter}}).toPromise();
  }
}
