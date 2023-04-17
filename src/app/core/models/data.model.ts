export type EntityType = 'Exam' | 'Homework' | 'Tutorial';
export type Gender = 1 | 2; // 1:Male, 2:Female
export type SchoolGender = 1 | 2 | 3; // 1:Male, 2:Female, 3:Mixed

interface ChartData {
  corrected?: { _id: string, count: number }[];
  created?: { _id: string, count: number }[];
  done?: { _id: string, count: number }[];
  available?: { _id: string, count: number }[];
  downloaded?: { _id: string, count: number }[];
  seen?: { _id: string, count: number }[];
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  id?: string;
  username: string;
  password: string;
  email: string;
  phone_number: string;
  permission: string;
  status: boolean;
  last_visit?: string;
}

export interface Province {
  province_id: number;
  title: string;
}

export interface District {
  province_id: number;
  district_id: number;
  title: string;
}

export interface Item {
  id: string;
  title: string;
}

export interface CountBar {
  exams?: number;
  homeworks?: number;
  tutorials?: number;
  teachers?: number;
  students?: number;
  boys?: number;
  girls?: number;
}

export interface Usage {
  exams?: number;
  homeworks?: number;
  tutorials?: number;
  schools?: number;
  m_schools?: number;
  f_schools?: number;
  total?: number;
}

export interface GradeCount {
  elementary?: number;
  middle?: number;
  high?: number;
  was?: number;
  tap?: number;
}

export interface ExamCount {
  created?: number;
  available?: number;
  done?: number;
  corrected?: number;
  created_per_gender?: number;
  created_per_type?: number;
  student_participation?: number;
  chart_data?: ChartData;
}

export interface TutorialCount {
  seen?: number;
  created?: number;
  downloaded?: number;
  created_per_gender?: number;
  jpg_created?: number;
  pdf_created?: number;
  mp4_created?: number;
  chart_data?: ChartData;
}

export interface CountBarFilter {
  grade?: 'Elementary';
  gender_id?: Gender;
  major?: string;
  stage?: string;
  province_id?: number;
  district_id?: number;
  start_time?: string;
  end_time?: string;
}

export interface UsageFilter {
  gender_id?: Gender;
  province_id?: number;
  district_id?: number;
  school_type?: 'Governmental' | '';
  grade?: 'Elementary';
  school_id?: number;
  school_gender?: SchoolGender;
}

export interface EntityCountFilter {
  start_time?: string;
  end_time?: string;
  school_gender?: SchoolGender;
  lesson_id?: number;
  type?: 'MultiChoice' | 'Descriptive';
}
