import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'ng-multi-answer-item',
  templateUrl: './multi-answer-item.component.html',
  styleUrls: ['./multi-answer-item.component.scss']
})
export class MultiAnswerItemComponent {
  @Input() unanswered: number;
  @Input() wrongAnswer: number;
  @Input() correctAnswer: number;
  @Input() point: number;
  @Input() title: string;
  @Input() showPointInput: boolean;
  @Input() readonly: boolean;
  @Output() pointChange = new EventEmitter<any>();
  @Output() answerChange = new EventEmitter<any>();

  answers = [
    {text: 1, correct: false, wrong: false, unanswered: false},
    {text: 2, correct: false, wrong: false, unanswered: false},
    {text: 3, correct: false, wrong: false, unanswered: false},
    {text: 4, correct: false, wrong: false, unanswered: false}
  ]

  ngOnChanges(): void {
    if (this.correctAnswer) {
      this.setActiveAnswer(this.correctAnswer - 1);
    }
    if (this.wrongAnswer) {
      this.setWrongAnswer(this.wrongAnswer - 1);
    }
    if (this.unanswered) {
      this.setUanswered(this.unanswered - 1);
    }
  }

  onPointChange(event: any) {
    this.pointChange.emit(event.target.value);
  }

  onAnswerChange(event: any, index: number) {
    if (this.readonly) {
      return;
    }
    this.setActiveAnswer(index);
    this.answerChange.emit(index + 1);
  }

  setActiveAnswer(index: number) {
    this.answers.forEach(answer => answer.correct = false);
    this.answers[index].correct = true;
  }

  setWrongAnswer(index: number) {
    this.answers.forEach(answer => answer.wrong = false);
    this.answers[index].wrong = true;
  }

  setUanswered(index: number) {
    this.answers.forEach(answer => answer.unanswered = false);
    this.answers[index].unanswered = true;
  }
}
