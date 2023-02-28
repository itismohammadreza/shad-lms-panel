import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ng-exam',
  templateUrl: './exam.page.html',
  styleUrls: ['./exam.page.scss']
})
export class ExamPage implements OnInit {

  constructor() {
  }

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

  ngOnInit(): void {
  }

}
