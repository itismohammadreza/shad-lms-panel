import {Injectable} from '@angular/core';
import {ApiService} from "@core/http/api.service";
import {
  CountBar,
  CountBarFilter,
  District,
  EntityCountFilter,
  EntityType,
  ExamCount,
  GradeCount,
  Province,
  TutorialCount,
  Usage,
  UsageFilter,
  User
} from "@core/models";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService extends ApiService {
  constructor() {
    super()
  }

  get schoolTypes() {
    return [
      {value: '33', label: 'کانون فرهنگی و تربیتی'},
      {value: '24', label: 'هیئت امنایی'},
      {value: '10', label: 'استعدادهاي درخشان'},
      {value: '42', label: 'دارالقرآن'},
      {value: '63', label: 'مجتمع آموزشي وپرورشي'},
      {value: '23', label: 'آموزش از راه دور غیر دولتی'},
      {value: '9', label: 'سایر'},
      {value: '7', label: 'عشایری'},
      {value: '13', label: 'مشارکت مردمی'},
      {value: '25', label: 'غير دواتی خیریه'},
      {value: '12', label: 'بزرگسالان'},
      {value: '42', label: 'مدرسه تخصصی قرآن'},
      {value: '35', label: 'مجتمع ورزشی'},
      {value: '2', label: 'نمونه دولتی'},
      {value: '1', label: 'عادی دولتی'},
      {value: '4', label: 'غیر دولتی'},
      {value: '14', label: 'وابسته نوع دوم'},
      {value: '34', label: 'مدرسه قرآن'},
      {value: '18', label: 'بین المللی'},
      {value: '5', label: 'ایثارگران'},
      {value: '6', label: 'شاهد'},
      {value: '8', label: 'شبانه روزی'},
      {value: '44', label: 'خوابگاه مرکزی(فقط مخصوص جدول خوابگاه)'},
      {value: '56', label: 'مرکز L.D'},
      {value: '43', label: 'پژوهش سرا و آزمایشگاه مرکزی'},
      {value: '15', label: 'وابسته نوع اول'},
    ]
  }

  get genders() {
    return [{label: 'پسر', value: 1}, {label: 'دختر', value: 2}];
  }

  get schoolGenders() {
    return [{label: 'پسرانه', value: 1}, {label: 'دخترانه', value: 2}, {label: 'مختلط', value: 3}];
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

  getGradeCount(type: EntityType) {
    return this._get<GradeCount>('object-count-per-grade', {params: {type}}).toPromise();
  }

  getUsage(filter?: UsageFilter) {
    return this._get<Usage>('lms-usage', {params: {...filter}}).pipe(map(res =>
      ({...res, total: Object.values(res).reduce((acc, cur) => acc + cur, 0)})
    )).toPromise();
  }

  getCountBar(filter?: CountBarFilter) {
    return this._get<CountBar>('count-bar', {params: {...filter}}).toPromise();
  }

  getExamCount(filter?: EntityCountFilter) {
    return this._get<ExamCount>('exam-count-page', {params: {...filter}}).toPromise();
  }

  getHomeworkCount(filter?: EntityCountFilter) {
    return this._get<ExamCount>('homework-count-page', {params: {...filter}}).toPromise();
  }

  getTutorialCount(filter?: EntityCountFilter) {
    return this._get<TutorialCount>('tutorial-count-page', {params: {...filter}}).toPromise();
  }

  getProvinces() {
    return this._get<Province[]>('provinces', {params: {limit: 100, offset: 0}}).toPromise();
  }

  getDistricts(provinceId: number) {
    return this._get<District[]>('provinces', {params: {limit: 100, offset: 0, province_id: provinceId}}).toPromise();
  }
}
