import {Component, Input} from '@angular/core';

@Component({
  selector: 'ng-descriptive-answer-item',
  templateUrl: './descriptive-answer-item.component.html',
  styleUrls: ['./descriptive-answer-item.component.scss']
})
export class DescriptiveAnswerItemComponent {
  @Input() completed: boolean = true;
  @Input() index: number | string;
  @Input() isDocumentAnswer: boolean;
  @Input() isTextAnswer: boolean;
}
