import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Exam} from "@core/models";
import {ExamService} from "@core/http";

@Component({
  selector: 'ng-exam-file-preview',
  templateUrl: './exam-file-preview.component.html',
  styleUrls: ['./exam-file-preview.component.scss']
})
export class ExamFilePreviewComponent implements OnInit {
  @Input() exam: Exam;
  @Input() activeTab: number = 0;
  @Input() fileData: {
    pagesCount: number,
    currentPage: number,
    currentUrl: string,
  } = {
    pagesCount: null,
    currentPage: 0,
    currentUrl: null
  };
  @Output() activeTabChange = new EventEmitter()
  @Output() fileDataChange = new EventEmitter()

  constructor(private examService: ExamService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    await this.updateCurrentExamFile(0, 0);
  }

  updateCurrentExamFile(fileIndex: number, pictureIndex: number) {
    fileIndex += 1;
    const url = this.examService.getExamFileLink(this.exam.id, fileIndex, 'question', this.exam.server_id, pictureIndex);
    this.fileData.currentPage = pictureIndex;
    this.fileData.currentUrl = url;
    this.fileData.pagesCount = this.exam.files.find(file => file.index == fileIndex).question_file.pictures_count;
    this.fileDataChange.emit(this.fileData);
    this.cd.detectChanges()
  }

  onChangeTab(event: any) {
    const selectedIndex = event.index;
    this.activeTab = selectedIndex;
    this.activeTabChange.emit(this.activeTab)
    this.fileData.pagesCount = this.exam.files.find(file => file.index == selectedIndex + 1).question_file.pictures_count;
    this.updateCurrentExamFile(this.activeTab, 0);
  }

  getNextExamFile() {
    ++this.fileData.currentPage;
    this.updateCurrentExamFile(this.activeTab, this.fileData.currentPage);
  }

  getPrevExamFile() {
    --this.fileData.currentPage;
    this.updateCurrentExamFile(this.activeTab, this.fileData.currentPage);
  }
}
