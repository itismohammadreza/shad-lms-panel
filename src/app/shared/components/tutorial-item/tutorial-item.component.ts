import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Tutorial} from "@core/models";
import {ExamService} from "@core/http";
import {OverlayService} from "@ng/services";

@Component({
  selector: 'ng-tutorial-item',
  templateUrl: './tutorial-item.component.html',
  styleUrls: ['./tutorial-item.component.scss']
})
export class TutorialItemComponent {
  constructor(private examService: ExamService, private overlayService: OverlayService) {
  }

  @Input() tutorial: Tutorial;
  @Output() onDelete = new EventEmitter()

  getCover() {
    return this.examService.getTutorialLink(this.tutorial.id, 0, this.tutorial.server_id);
  }

  getDiffFromNow() {
    return this.examService.getDiffFromNow(this.tutorial.date_created)
  }

  async deleteTutorial(event: Event) {
    event.stopPropagation()
    const confirmRes = await this.overlayService.showConfirmDialog({
      header: 'هشدار',
      message: 'آیا از حذف درسنامه مطمئن هستید؟',
    });
    if (confirmRes) {
      this.onDelete.emit()
    }
  }
}
