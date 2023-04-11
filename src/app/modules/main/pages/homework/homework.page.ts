import {Component, OnInit} from '@angular/core';
import {ExamCount, GradeCount} from "@core/models";
import {DataService} from "@core/http";
import {FormControl, FormGroup} from "@angular/forms";
import {UtilsService} from "@ng/services";

@Component({
  selector: 'ng-homework',
  templateUrl: './homework.page.html',
  styleUrls: ['./homework.page.scss']
})
export class HomeworkPage implements OnInit {
  stackedData = {
    labels: ['تهران', 'اصفهان', 'شیراز', 'اردبیل', 'قم', 'تبریز', 'مشهد'],
    datasets: [{
      type: 'bar',
      backgroundColor: '#42A5F5',
      data: [
        50,
        25,
        12,
        48,
        90,
        76,
        42
      ]
    }, {
      type: 'bar',
      backgroundColor: '#66BB6A',
      data: [
        21,
        84,
        24,
        75,
        37,
        65,
        34
      ]
    }, {
      type: 'bar',
      backgroundColor: '#FFA726',
      data: [
        41,
        52,
        24,
        74,
        23,
        21,
        32
      ]
    }]
  };
  stackedOptions = {
    plugins: {
      legend: {display: false},
      tooltips: {
        mode: 'index',
        intersect: false
      },
      // legend: {
      //   labels: {
      //     color: '#495057'
      //   }
      // }
    },
    scales: {
      x: {
        stacked: false,
        ticks: {
          font: {family: 'IRANSans'},
        },
        // ticks: {
        //   color: '#495057'
        // },
        // grid: {
        //   color: '#ebedef'
        // }
      },
      y: {
        stacked: false,
        ticks: {
          font: {family: 'IRANSans'},
        }
        // ticks: {
        //   color: '#495057'
        // },
        // grid: {
        //   color: '#ebedef'
        // }
      }
    }
  };
  form = new FormGroup({
    start_time: new FormControl(),
    end_time: new FormControl(),
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

  constructor(private dataService: DataService, private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.loadData()
  }

  async loadData() {
    this.gradeCount = await this.dataService.getGradeCount('Homework')
    this.count = await this.dataService.getHomeworkCount()
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
