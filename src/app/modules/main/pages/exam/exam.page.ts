import {Component, OnInit} from '@angular/core';
import {ExamCount, GradeCount, Item} from "@core/models";
import {DataService} from "@core/http";
import {FormControl, FormGroup} from "@angular/forms";
import {UtilsService} from "@ng/services";

@Component({
  selector: 'ng-exam',
  templateUrl: './exam.page.html',
  styleUrls: ['./exam.page.scss']
})
export class ExamPage implements OnInit {
  chartData;
  chartOptions = this.dataService.chartOptions;
  form = new FormGroup({
    start_time: new FormControl(),
    end_time: new FormControl(),
    type: new FormControl(),
    lesson_id: new FormControl(),
    major: new FormControl(),
    stage: new FormControl(),
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
    this.gradeCount = await this.dataService.getGradeCount('Exam');
    this.count = await this.dataService.getExamCount();
    this.fields = await this.dataService.getFields();
    this.grades = await this.dataService.getGrades();
    const provinces = await this.dataService.getProvinces();
    this.chartData = {
      labels: provinces.map(p => p.title),
      datasets: [
        {
          label: 'درحال برگزاری',
          type: 'bar',
          backgroundColor: '#42A5F5',
          data: await this.dataService.getChartDataSet(this.count.chart_data.available)
        },
        {
          label: 'ایجاد شده',
          type: 'bar',
          backgroundColor: '#66BB6A',
          data: await this.dataService.getChartDataSet(this.count.chart_data.corrected)
        },
        {
          label: 'انجام شده',
          type: 'bar',
          backgroundColor: '#FFA726',
          data: await this.dataService.getChartDataSet(this.count.chart_data.done)
        }]
    };
  }

  async clearFilter() {
    this.count = await this.dataService.getExamCount();
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
    this.count = await this.dataService.getExamCount(filters)
    this.filterEnabled = true;
  }
}
