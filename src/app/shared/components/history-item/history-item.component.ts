import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'ng-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss']
})
export class HistoryItemComponent {
  @Input() readonly: boolean;
  @Input() title: string;
  @Input() desc: string;
  @Input() tag: string;
  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter()

  onClick() {
    if (!this.readonly) {
      this.selected = !this.selected;
      this.selectedChange.emit(this.selected)
    }
  }
}
