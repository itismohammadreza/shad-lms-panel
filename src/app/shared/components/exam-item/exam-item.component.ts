import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Exam} from "@core/models";
import {AuthService, ExamService} from "@core/http";

@Component({
  selector: 'ng-exam-item',
  templateUrl: './exam-item.component.html',
  styleUrls: ['./exam-item.component.scss']
})
export class ExamItemComponent implements OnInit, OnDestroy {
  @Input() exam: Exam;
  @Output() stateChange = new EventEmitter();

  startRemainingTime: any;
  remainingInterval: any;

  constructor(private examService: ExamService, private authService: AuthService) {
  }

  ngOnInit() {
    this.startRemainingTime = this.getExamStartRemainingTime(this.exam.start_time);
    this.remainingInterval = setInterval(() => {
      this.startRemainingTime = this.getExamStartRemainingTime(this.exam.start_time);
    }, 3000)
  }

  getExamStartRemainingTime(startTime: any) {
    let result;
    const minutes = this.examService.getExamStartRemainingMinutes(startTime);
    if (minutes + this.exam.duration <= 0) {
      result = {time: null, label: 'انجام شده', cssClass: 'disabled'};
      localStorage.removeItem(this.exam.id)
      this.stateChange.emit('finished')
    } else if (minutes <= 0) {
      result = {time: null, label: 'درحال برگزاری', cssClass: 'success'};
      this.stateChange.emit('running')
      this.calculateExamEndRemainingTime()
    } else if (minutes < 60) {
      result = {time: minutes, label: 'دقیقه', cssClass: 'danger'};
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      result = {time: hours, label: 'ساعت', cssClass: 'danger'};
    } else {
      const days = Math.floor((minutes / 60) / 24);
      result = {time: days, label: 'روز', cssClass: 'warning'};
    }
    return result;
  }

  calculateExamEndRemainingTime() {
    clearInterval(this.remainingInterval);
    this.remainingInterval = setInterval(() => {
      if (this.examService.isExamEnded(this.exam)) {
        localStorage.removeItem(this.exam.id)
        this.stateChange.emit('finished')
      }
    }, 1000)
  }

  isPrincipal() {
    return this.authService.isPrincipal()
  }

  ngOnDestroy() {
    clearInterval(this.remainingInterval);
  }
}
