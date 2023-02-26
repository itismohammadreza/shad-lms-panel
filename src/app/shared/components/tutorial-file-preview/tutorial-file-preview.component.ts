import {Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ExamService} from "@core/http";
import {Tutorial} from "@core/models";
import {Accordion, AccordionTab} from "primeng/accordion";

@Component({
  selector: 'ng-tutorial-file-preview',
  templateUrl: './tutorial-file-preview.component.html',
  styleUrls: ['./tutorial-file-preview.component.scss']
})
export class TutorialFilePreviewComponent implements OnInit {
  @Input() tutorial: Tutorial;

  images: any[] = [];
  videos: any[] = [];
  docs: any[] = [];

  @ViewChildren(AccordionTab) accordions: QueryList<AccordionTab>;

  constructor(private examService: ExamService) {
  }

  ngAfterViewInit() {
    this.accordions.toArray().forEach(el => {
      el.selected = false;
    })
  }

  ngOnInit() {
    this.tutorial.files.forEach((file, i) => {
      const fileType = this.getMediaType(file);
      const link = this.getLink(fileType, i);
      switch (fileType) {
        case 'image':
          this.images.push({fileIndex: i, file: link, name: file.name})
          break;
        case 'video':
          this.videos.push({fileIndex: i, file: link, name: file.name})
          break;
        case 'pdf':
          this.docs.push({fileIndex: i, file: link, name: file.name})
          break;
      }
    })
  }

  getMediaType(file: any) {
    switch (this.getFileExtension(file.name)) {
      case 'jpg':
      case 'png':
      case 'jpeg':
        return 'image';
      case 'mp4':
        return 'video';
      case 'pdf':
        return 'pdf';
    }
  }

  getFileExtension(fileName) {
    return /[^.]+$/.exec(fileName)[0]
  }

  getLink(type: string, fileIndex: number) {
    switch (type) {
      case 'image':
      case 'pdf':
        return this.examService.getTutorialLink(this.tutorial.id, fileIndex + 1, this.tutorial.server_id, 0)
      case 'video':
        return this.examService.getTutorialLink(this.tutorial.id, fileIndex + 1, this.tutorial.server_id)
    }
  }

  downloadPdf(fileIndex: number) {
    const link = this.examService.getTutorialLink(this.tutorial.id, fileIndex + 1, this.tutorial.server_id)
    this.examService.downloadLink(link);
  }
}
