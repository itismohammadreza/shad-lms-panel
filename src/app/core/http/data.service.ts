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
  Item,
  Province,
  School,
  SchoolFilter,
  TutorialCount,
  Usage,
  UsageFilter,
  User,
  UserFilter
} from "@core/models";
import {map, Subject} from "rxjs";
import {HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService extends ApiService {
  constructor() {
    super()
  }

  profileUpdated$ = new Subject<Partial<User>>();

  private _user: User;

  set user(user: User) {
    this._user = user;
  }

  get user() {
    return this._user;
  }

  get chartOptions() {
    return {
      plugins: {
        legend: {
          labels: {
            font: {family: 'IRANSans'},
          },
          position: 'bottom'
        },
        tooltip: {
          titleFont: {
            family: 'IRANSans'
          },
          bodyFont: {
            family: 'IRANSans'
          },
        }
      },
      scales: {
        x: {
          stacked: false,
          ticks: {
            font: {family: 'IRANSans'},
          },
        },
        y: {
          stacked: false,
          ticks: {
            font: {family: 'IRANSans'},
          },
        }
      }
    };
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

  async getChartDataSet(list: any) {
    const provinces = await this.getProvinces();
    const result = Array(provinces.length).fill(null);
    list.forEach((av, index) => {
      const prIndex = provinces.findIndex(p => p.province_id == +av._id);
      result[prIndex] = av.count;
    })
    return result;
  }

  getProfile() {
    return this._get<User>('profile').toPromise();
  }

  editProfile(data: User) {
    return this._put<User>('profile', data).toPromise();
  }

  downloadAvatar(userId: string) {
    return this._get<HttpResponse<any>>(`avatar/${userId}`, {
      observe: 'response',
      responseType: 'blob'
    }).toPromise();
  }

  uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this._post<any>(`avatar/${this.user.id}`, formData).toPromise();
  }

  getUsers(filter?: UserFilter) {
    return this._get<User[]>('users', {params: {...filter}}).toPromise();
  }

  addUser(data: User) {
    return this._post<{ user: User }>('users', data).toPromise();
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
    return this._get<Province[]>('provinces', {params: {limit: 50, offset: 0}}).toPromise();
  }

  getDistricts(provinceId: number) {
    return this._get<District[]>('districts', {params: {limit: 50, offset: 0, province_id: provinceId}}).toPromise();
  }

  getSchools(filter?: SchoolFilter) {
    return this._get<School[]>('schools', {params: {...filter, limit: 50}}).toPromise();
  }

  getFields() {
    return this._get<Item[]>('fields').toPromise();
  }

  getGrades() {
    return this._get<Item[]>('grades', {params: {limit: 50, offset: 0}}).toPromise();
  }
}
