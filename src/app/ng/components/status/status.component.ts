import {Component, Input} from '@angular/core';
import {NgStatus} from "@ng/models/offset";

@Component({
  selector: 'ng-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  @Input() status: NgStatus = "404";
  @Input() icon: string;
  @Input() imageSrc: string;
  @Input() title: string = 'صفحه ای که به دنبال آن بودید یافت نشد';
  @Input() subtitle: string;
}
