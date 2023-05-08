import {Component, OnInit} from '@angular/core';
import {ExamCount, GradeCount, Item} from "@core/models";
import {DataService} from "@core/http";
import {FormControl, FormGroup} from "@angular/forms";
import {UtilsService} from "@ng/services";

@Component({
  selector: 'ng-homework',
  templateUrl: './homework.page.html',
  styleUrls: ['./homework.page.scss']
})
export class HomeworkPage implements OnInit {
  chartData;
  chartOptions = this.dataService.chartOptions;
  form = new FormGroup({
    start_time: new FormControl(),
    end_time: new FormControl(),
    lesson_id: new FormControl(),
    field: new FormControl(),
    grade: new FormControl(),
    gender_id: new FormControl(),
  }, this.bothDatesValidator);
  gradeCount: GradeCount = {};
  count: ExamCount = {};
  filterEnabled: boolean = false;
  genders = this.dataService.genders;
  fields: Item[] = [];
  grades: Item[] = [];

  constructor(private dataService: DataService, private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.loadData()
  }

  async loadData() {
    this.gradeCount = await this.dataService.getGradeCount('Homework');
    this.count = await this.dataService.getHomeworkCount();
    this.fields = await this.dataService.getFields();
    this.grades = await this.dataService.getGrades();
    const provinces = await this.dataService.getProvinces();
    this.chartData = {
      labels: provinces.map(p => p.title),
      datasets: [
        {
          label: 'ایجاد شده',
          type: 'bar',
          backgroundColor: '#FDE9CC',
          data: await this.dataService.getChartDataSet(this.count.chart_data.created)
        },
        {
          label: 'تصحیح شده',
          type: 'bar',
          backgroundColor: '#BBD3EA',
          data: await this.dataService.getChartDataSet(this.count.chart_data.corrected)
        },
        {
          label: 'انجام شده',
          type: 'bar',
          backgroundColor: '#F6C1BB',
          data: await this.dataService.getChartDataSet(this.count.chart_data.done)
        },
        {
          label: 'همه',
          type: 'bar',
          backgroundColor: '#8CA6E9',
          data: await this.dataService.getChartDataSum(this.count.chart_data)
        }
      ]
    };
  }

  async clearFilter() {
    this.count = await this.dataService.getHomeworkCount();
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

  async onSubmitFilter() {
    const filters = this.utilsService.getDirtyControls(this.form);
    if (!filters) {
      return;
    }
    this.count = await this.dataService.getHomeworkCount(filters)
    this.filterEnabled = true;
  }
}
