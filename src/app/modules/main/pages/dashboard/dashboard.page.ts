import {Component, OnInit} from '@angular/core';
import {DataService} from "@core/http";
import {FormControl, FormGroup} from "@angular/forms";
import {MomentService} from "@ng/services";

@Component({
  selector: 'ng-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  constructor(private dataService: DataService, private momentService: MomentService) {
  }

  form = new FormGroup({
    start_time: new FormControl(),
    end_time: new FormControl(),
  }, this.bothDatesValidator);
  exam: any = {};
  homework: any = {};
  tutorial: any = {};
  filterEnabled: boolean = false;

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.exam = await this.dataService.getObjectsDetail('Exam');
    this.homework = await this.dataService.getObjectsDetail('Homework');
    this.tutorial = await this.dataService.getObjectsDetail('Tutorial');
  }

  async onSubmitFilter() {
    let {start_time, end_time} = this.form.value;
    start_time = this.momentService.getIsoDateWithoutTimeZone(start_time.toDate()).split('.')[0];
    end_time = this.momentService.getIsoDateWithoutTimeZone(end_time.toDate()).split('.')[0];
    this.exam = await this.dataService.getObjectsDetail('Exam', {start_time, end_time});
    this.homework = await this.dataService.getObjectsDetail('Homework', {start_time, end_time});
    this.tutorial = await this.dataService.getObjectsDetail('Tutorial', {start_time, end_time});
    this.filterEnabled = true;
  }

  async clearFilter() {
    this.exam = await this.dataService.getObjectsDetail('Exam');
    this.homework = await this.dataService.getObjectsDetail('Homework');
    this.tutorial = await this.dataService.getObjectsDetail('Tutorial');
    this.form.reset();
    this.filterEnabled = false;
  }

  bothDatesValidator(group: FormGroup) {
    const start_time = group.get('start_time').value;
    const end_time = group.get('end_time').value;
    const bothFilled = !!start_time && !!end_time;
    const bothEmpty = !start_time && !end_time;
    return (bothFilled || bothEmpty) ? null : {invalidDate: true};
  }
}
