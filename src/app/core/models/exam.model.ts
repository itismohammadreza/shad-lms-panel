export type ExamType = 'MultiChoice' | 'Descriptive' | 'Homework';
export type ExamState = 'running' | 'finished';

export interface FileItem {
  name: string;
  pictures_count?: number;
}

export interface FilterConfig {
  limit?: number;
  offset?: number;
  is_active?: boolean;
  is_homework?: boolean;
  is_finished?: boolean;
  sort?: string;
  search?: string;
}

export interface Exam {
  id?: any;
  title?: string;
  description?: string;
  duration?: number;
  is_active?: boolean;
  start_time?: any;
  end_time?: any;
  class_id?: string;
  has_negative_point?: boolean;
  type?: ExamType;
  suggested_time?: string;
  files?: ExamFile[];
  state?: ExamState;
  already_answered?: boolean;
  has_complete?: boolean;
  server_id?: string;
  teacher?: string;
}

export interface ExamFile {
  index?: number;
  answer_sheet?: AnswerSheet;
  answer_file: string;
  question_file: FileItem | any;
}

export interface AnswerSheet {
  answers_count: number;
  total_point: number;
  answers: Answer[];
}

export interface Answer {
  index?: number;
  point?: number;
  correct_option?: number;
}

export interface QuestionFile {
  file_name: string;
  file_url: string
}

export interface Student {
  uid: any;
  full_name: string;
}

export interface Tutorial {
  id?: string,
  title?: string,
  subject?: string,
  description?: string,
  teacher?: string,
  cover?: string,
  date_created?: string,
  comments_count?: number;
  view_count?: number;
  download_count?: number;
  like_count?: number;
  students_count?: number;
  not_viewed_count?: number;
  liked?: boolean;
  files?: FileItem[];
  server_id?: string,
}
