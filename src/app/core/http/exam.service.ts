import {Injectable} from '@angular/core';
import {ApiService} from "@core/http/api.service";
import {Exam, FilterConfig, Tutorial} from "@core/models";
import {Router, UrlSerializer} from "@angular/router";
import {MomentService, OverlayService} from "@ng/services";
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ExamService extends ApiService {
  constructor(private router: Router,
              private urlSerializer: UrlSerializer,
              private momentService: MomentService,
              private location: Location,
              private overlayService: OverlayService) {
    super()
  }

  //////////////////////////////////////////////////////////////////////////////
  //                                   EXAM                                   //
  //////////////////////////////////////////////////////////////////////////////
  getExams(filter?: FilterConfig) {
    const params = {
      is_finished: false,
      sort: 'start_time',
      limit: 10,
      ...filter,
    }
    return this._get<Exam[]>('exam', {params}).toPromise();
  }

  getExamById(id: string) {
    return this._get<Exam>(`exam/${id}`).toPromise();
  }

  createExam(data: Exam) {
    return this._post<any>('exam', data).toPromise();
  }

  updateExam(data: Exam) {
    return this._put<any>('exam', data).toPromise();
  }

  deleteExam(id: string) {
    return this._delete<any>(`exam/${id}`).toPromise();
  }

  changeExamActivation(id: string, is_active: boolean) {
    return this._post<Exam>('exam/activation', {id, is_active}).toPromise();
  }

  finishExam(id: string) {
    return this._get<any>(`answer/${id}/finish`).toPromise();
  }

  getStudentAnswers(id: string) {
    return this._get<any>(`answer/${id}`).toPromise();
  }

  answerQuestion(id: string, fileIndex: number, questionIndex: number, answer?: any, fileInfo?: any) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('file_index', fileIndex.toString());
    formData.append('question_index', questionIndex.toString());
    if (answer) {
      formData.append('answer', answer.toString());
    }
    if (fileInfo) {
      const {server_id, path, file_name} = fileInfo;
      formData.append('server_id', server_id.toString());
      formData.append('path', path.toString());
      formData.append('file_name', file_name.toString());
    }
    return this._post<any>('answer', formData).toPromise();
  }

  getExamStatistics(is_homework: boolean) {
    return this._get<any>('exam/chart', {
      params: {is_homework}
    }).toPromise()
  }

  //////////////////////////////////////////////////////////////////////////////
  //                                  HISTORY                                 //
  //////////////////////////////////////////////////////////////////////////////
  getHistories(filter?: FilterConfig) {
    return this._get<Exam[]>('exam', {
      params: {
        is_finished: true,
        sort: '-start_time',
        limit: 10,
        ...filter
      }
    }).toPromise();
  }

  getStudentHistories(filter?: FilterConfig) {
    return this._get<any>('exam', {
      params: {
        is_finished: true,
        sort: 'start_time',
        limit: 10,
        ...filter
      }
    }).toPromise();
  }

  getStudentHistoryAnswers(examId: string) {
    return this._get<any>(`answer/history/${examId}`).toPromise();
  }

  getHistoryScoresChart(examId: string) {
    return this._get<any>(`exam/finished/${examId}`).toPromise();
  }

  getStudentsAnswers(examId: string) {
    return this._get<any>(`exam/answers/${examId}`).toPromise();
  }

  correctStudent(data: any) {
    return this._post<any>('exam/correct', data).toPromise();
  }

  recreate(id: string, start_time: string) {
    return this._post<any>('exam/recreate', {id, start_time}).toPromise();
  }

  //////////////////////////////////////////////////////////////////////////////
  //                                TUTORIAL                                  //
  //////////////////////////////////////////////////////////////////////////////
  getTutorials(filter?: FilterConfig) {
    return this._get<any>('tutorial', {params: {...filter, sort: '-date_created'}}).toPromise();
  }

  getTutorialById(id: string) {
    return this._get<Tutorial>(`tutorial/${id}`).toPromise();
  }

  createTutorial(data: Tutorial) {
    return this._post<any>('tutorial', data).toPromise();
  }

  updateTutorial(data: Tutorial) {
    return this._put<any>('tutorial', data).toPromise();
  }

  getTutorialComments(id: string, filter?: FilterConfig) {
    return this._get<any>(`tutorial/comment/${id}`, {params: {...filter}}).toPromise();
  }

  commentTutorial(id: string, text: string) {
    return this._post<any>('tutorial/comment', {id, text}).toPromise();
  }

  likeTutorial(id: string) {
    return this._get<any>(`tutorial/like/${id}`).toPromise();
  }

  dislikeTutorial(id: string) {
    return this._get<any>(`tutorial/dislike/${id}`).toPromise();
  }

  deleteTutorial(id: string) {
    return this._delete<any>(`tutorial/${id}`).toPromise();
  }

  getTutorialStatistics() {
    return this._get<any>('tutorial/chart').toPromise()
  }

  //////////////////////////////////////////////////////////////////////////////
  //                                ACTIVITY                                  //
  //////////////////////////////////////////////////////////////////////////////
  getActivities(data: any) {
    return this._get<any>(`office/${data.classId}/${data.lessonId}`, {
      params: {
        type: data.type,
        start_time: data.start_time,
        end_time: data.end_time,
        sort: 'start_time',
      }
    }).toPromise();
  }

  createClassActivity(data: any) {
    return this._post<any>('office', data).toPromise();
  }

  //////////////////////////////////////////////////////////////////////////////
  //                                   USER                                   //
  //////////////////////////////////////////////////////////////////////////////
  getClasses(filter?: FilterConfig) {
    return this._get<any>('user/classes', {params: {...filter}}).toPromise();
  }

  getStudents(classId: string, lessonId: string = 'none') {
    return this._get<any>(`user/students/${classId}/${lessonId}`).toPromise();
  }

  //////////////////////////////////////////////////////////////////////////////
  //                              UPLOAD/DOWNLOAD                             //
  //////////////////////////////////////////////////////////////////////////////
  preUploadFile() {
    return this._post<any>('preUpload', null).toPromise();
  }

  uploadFile(fileName: string, file: File, serverId: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('file_name', fileName);
    formData.append('server_id', serverId);
    return this._post<any>('upload', formData).toPromise();
  }

  uploadTutorialFile(fileName: string, file: any, serverId: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('file_name', fileName);
    formData.append('server_id', serverId);
    return this._post<any>('upload', formData, {
      reportProgress: true,
      responseType: 'json',
      observe: 'events'
    });
  }

  uploadAnswer(file: File, server_id: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('server_id', server_id);
    return this._post<any>('upload-answer', formData).toPromise();
  }

  getExamFileLink(id: string, file_index: number, which_file: string, server_id: string, picture?: number) {
    const token = encodeURIComponent(localStorage.getItem('token'))
    const tree = this.router.createUrlTree(['/'], {
      queryParams: {
        file_index,
        token,
        which_file,
        ...(picture != undefined && {picture})
      }
    });
    return `${this.baseUrl}/exam/download/${id}/${server_id}` + this.urlSerializer.serialize(tree);
  }

  getExamTempFileLink(fileId: string, server_id: string) {
    const token = encodeURIComponent(localStorage.getItem('token'))
    const tree = this.router.createUrlTree(['/'], {queryParams: {token}});
    return `${this.baseUrl}/download/${fileId}/${server_id}` + this.urlSerializer.serialize(tree);
  }

  getExamResultLink(id: string) {
    const token = encodeURIComponent(localStorage.getItem('token'))
    const tree = this.router.createUrlTree(['/'], {queryParams: {token}});
    return `${this.baseUrl}/exam/result/${id}` + this.urlSerializer.serialize(tree);
  }

  getAnswerFileLink(id: string, file_index: number, question_index: number, server_id: string, picture?: number, student_id?: string) {
    const token = encodeURIComponent(localStorage.getItem('token'))
    const tree = this.router.createUrlTree(['/'], {
      queryParams: {
        token,
        file_index,
        question_index,
        ...(picture != undefined && {picture}),
        ...(student_id != undefined && {student_id})
      }
    });
    return `${this.baseUrl}/answer/download/${id}/${server_id}` + this.urlSerializer.serialize(tree);
  }

  getActivityLink(activities: any[]) {
    let data = '';
    activities.forEach((a, i) => {
      data += `${a.id}-${a.type}${i == activities.length - 1 ? '' : ','}`
    })
    const token = encodeURIComponent(localStorage.getItem('token'))
    const tree = this.router.createUrlTree(['/'], {
      queryParams: {
        token,
        data,
        download: true
      }
    });
    return `${this.baseUrl}/office/detail` + this.urlSerializer.serialize(tree);
  }

  async downloadLink(url: string) {
    const res = await this._customRequest<any>(url, 'get', null, {
      observe: 'response',
      responseType: 'blob'
    }).toPromise();
    const disposition = atob(res.headers.get('content-disposition'));
    const fileName = disposition.split('filename=')[1].split(';')[0];
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob([res.body], {type: res.body.type}));
    downloadLink.setAttribute('download', fileName);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    this.overlayService.showToast({
      rtl: true,
      detail: 'فایل با موفقیت دانلود شد',
      severity: 'success'
    })
  }

  getTutorialLink(tutorial_id: string, file_index: number, server_id: string, picture?: number) {
    const token = encodeURIComponent(localStorage.getItem('token'))
    const tree = this.router.createUrlTree(['/'], {
      queryParams: {
        token,
        file_index,
        ...(picture != undefined && {picture})
      }
    });
    return `${this.baseUrl}/tutorial/download/${tutorial_id}/${server_id}` + this.urlSerializer.serialize(tree);
  }

  //////////////////////////////////////////////////////////////////////////////
  //                                  UTILS                                   //
  //////////////////////////////////////////////////////////////////////////////
  getExamEndRemainingSeconds(exam: Exam) {
    const duration = (exam.duration * 60);
    const examStart = this.momentService.convertToGregorian(exam.start_time, 'YYYY-MM-DD hh:mm:ss');
    examStart.seconds(examStart.seconds() + duration);
    const now = this.momentService.getJalaliMoment().locale('fa');
    const diff = examStart.diff(now);
    return Math.floor(diff / 1000);
  }

  getExamStartRemainingMinutes(startTime: string) {
    const now = this.momentService.getJalaliMoment();
    const convertedStartTime = this.momentService.convertToGregorian(startTime, 'YYYY-MM-DD hh:mm');
    convertedStartTime.minute(convertedStartTime.minute() + 1);
    return convertedStartTime.diff(now, 'minutes');
  }

  isExamEnded(exam: Exam) {
    const examStart = this.momentService.getJalaliMoment(exam.start_time, 'jYYYY/jMM/jDD HH:mm');
    const examEnd = examStart.add(exam.duration, 'minute');
    const now = this.momentService.getJalaliMoment();
    return examEnd.isBefore(now);
  }

  resetHistoryState() {
    history.pushState({id: 'init'}, 'none');
  }

  getDiffFromNow(date: string) {
    return this.momentService.convertToGregorian(date, 'YYYY-MM-DD HH:mm').locale('fa').fromNow()
  }
}
