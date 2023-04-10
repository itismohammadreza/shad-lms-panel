import {Component, OnInit} from '@angular/core';
import {DataService} from "@core/http";
import {FormControl, FormGroup} from "@angular/forms";
import {MomentService, UtilsService} from "@ng/services";
import {CountBar, Usage} from "@core/models";

@Component({
  selector: 'ng-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  countBarForm = new FormGroup({
    grade: new FormControl(),
    gender_id: new FormControl(),
    major: new FormControl(),
    stage: new FormControl(),
    province_id: new FormControl(),
    district_id: new FormControl(),
    start_time: new FormControl(),
    end_time: new FormControl(),
  }, this.bothDatesValidator);
  usageForm = new FormGroup({
    school_gender: new FormControl(),
    province_id: new FormControl(),
    district_id: new FormControl(),
    school_type: new FormControl(),
    grade: new FormControl(),
    school_id: new FormControl(),
  })
  countBar: CountBar = {};
  usage: Usage = {};
  countBarFilterEnabled: boolean = false;
  usageFilterEnabled: boolean = false;
  schoolTypes = [
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
  genders = [{label: 'پسر', value: 1}, {label: 'دختر', value: 2}]
  schoolGenders = [{label: 'پسرانه', value: 1}, {label: 'دخترانه', value: 2}, {label: 'مختلط', value: 3}]

  constructor(private dataService: DataService,
              private momentService: MomentService,
              private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.countBar = await this.dataService.getCountBar();
    this.usage = await this.dataService.getUsage();
  }

  async onSubmitCountBarFilter() {
    const filters: any = this.utilsService.getDirtyControls(this.countBarForm);
    if (!filters) {
      return;
    }
    let {start_time, end_time} = filters;
    if (start_time && end_time) {
      filters.start_time = this.momentService.getIsoDateWithoutTimeZone(start_time.toDate()).split('.')[0];
      filters.end_time = this.momentService.getIsoDateWithoutTimeZone(end_time.toDate()).split('.')[0];
    }
    this.countBar = await this.dataService.getCountBar(filters)
    this.countBarFilterEnabled = true;
  }

  async clearCountBarFilter() {
    this.countBar = await this.dataService.getCountBar();
    this.countBarForm.reset();
    this.countBarFilterEnabled = false;
  }

  async onSubmitUsageFilter() {
    const filters = this.utilsService.getDirtyControls(this.usageForm);
    if (!filters) {
      return;
    }
    this.usage = await this.dataService.getUsage(filters)
    this.usageFilterEnabled = true;
  }

  async clearUsageFilter() {
    this.usage = await this.dataService.getUsage()
    this.usageForm.reset();
    this.usageFilterEnabled = false;
  }

  bothDatesValidator(group: FormGroup) {
    const start_time = group.get('start_time').value;
    const end_time = group.get('end_time').value;
    const bothFilled = !!start_time && !!end_time;
    const bothEmpty = !start_time && !end_time;
    return (bothFilled || bothEmpty) ? null : {invalidDate: true};
  }
}
