import {Component, OnInit} from '@angular/core';
import {DataService} from "@core/http";
import {FormControl, FormGroup} from "@angular/forms";
import {MomentService, UtilsService} from "@ng/services";
import {CountBar, Usage, UsageFilter} from "@core/models";

@Component({
  selector: 'ng-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  countBarForm = new FormGroup({
    grade: new FormControl(),
    sex: new FormControl(),
    major: new FormControl(),
    stage: new FormControl(),
    province_id: new FormControl(),
    district_id: new FormControl(),
    start_time: new FormControl(),
    end_time: new FormControl(),
  }, this.bothDatesValidator);
  usageForm = new FormGroup({
    sex: new FormControl(),
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

  exam: any = {};
  homework: any = {};
  tutorial: any = {};

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
    // this.exam = await this.dataService.getObjectsDetail('Exam');
    // this.homework = await this.dataService.getObjectsDetail('Homework');
    // this.tutorial = await this.dataService.getObjectsDetail('Tutorial');
  }

  async onSubmitCountBarFilter() {
    let {start_time, end_time} = this.countBarForm.value;
    start_time = this.momentService.getIsoDateWithoutTimeZone(start_time.toDate()).split('.')[0];
    end_time = this.momentService.getIsoDateWithoutTimeZone(end_time.toDate()).split('.')[0];
    this.exam = await this.dataService.getObjectsDetail('Exam');
    this.homework = await this.dataService.getObjectsDetail('Homework');
    this.tutorial = await this.dataService.getObjectsDetail('Tutorial');
    this.countBarFilterEnabled = true;
  }

  async clearCountBarFilter() {
    this.exam = await this.dataService.getObjectsDetail('Exam');
    this.homework = await this.dataService.getObjectsDetail('Homework');
    this.tutorial = await this.dataService.getObjectsDetail('Tutorial');
    this.countBarForm.reset();
    this.countBarFilterEnabled = false;
  }

  async onSubmitUsageFilter() {
    const filter = this.utilsService.getDirtyControls(this.countBarForm);
    this.usage = await this.dataService.getUsage(filter)
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
