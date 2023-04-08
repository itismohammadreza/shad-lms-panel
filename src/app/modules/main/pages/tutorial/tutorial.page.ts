import {Component, OnInit} from '@angular/core';
import {GradeCount} from "@core/models";
import {DataService} from "@core/http";

@Component({
  selector: 'ng-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss']
})
export class TutorialPage implements OnInit {
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
  gradeCount: GradeCount = {};

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.loadData()
  }

  async loadData() {
    this.gradeCount = await this.dataService.getGradeCount('Tutorial')
  }
}
