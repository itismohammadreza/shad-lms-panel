import {Type} from '@angular/core';
import {
  DescriptiveAnswerItemComponent
} from "@shared/components/descriptive-answer-item/descriptive-answer-item.component";
import {ExamFilePreviewComponent} from "@shared/components/exam-file-preview/exam-file-preview.component";
import {MultiAnswerItemComponent} from "@shared/components/multi-answer-item/multi-answer-item.component";
import {PageContainerComponent} from "@shared/components/page-container/page-container.component";
import {ExamItemComponent} from "@shared/components/exam-item/exam-item.component";
import {HistoryItemComponent} from "@shared/components/history-item/history-item.component";
import {TutorialItemComponent} from "@shared/components/tutorial-item/tutorial-item.component";
import {TutorialFilePreviewComponent} from "@shared/components/tutorial-file-preview/tutorial-file-preview.component";

export const COMPONENTS: Type<any>[] = [
  DescriptiveAnswerItemComponent,
  ExamFilePreviewComponent,
  ExamItemComponent,
  HistoryItemComponent,
  MultiAnswerItemComponent,
  PageContainerComponent,
  TutorialItemComponent,
  TutorialFilePreviewComponent
];
