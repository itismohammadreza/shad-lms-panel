import {Component, Input} from '@angular/core';

@Component({
  selector: 'ng-figure',
  templateUrl: './figure.component.html',
  styleUrls: ['./figure.component.scss']
})
export class FigureComponent {
  @Input() title: string;
  @Input() sub: string | number;
  @Input() layout: 'horizontal' | 'vertical' = 'vertical';
}
