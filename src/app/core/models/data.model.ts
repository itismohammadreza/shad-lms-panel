export type EntityType = 'Exam' | 'Homework' | 'Tutorial';

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

export interface CountBar {
  exams?: number;
  homeworks?: number;
  tutorials?: number;
  teachers?: number;
  students?: number;
  boys?: number;
  girls?: number;
}

export interface CountBarFilter {
  grade?: 'Elementary';
  sex?: 'Male';
  major?: string;
  stage?: string;
  province_id?: number;
  district_id?: number;
  start_time?: string;
  end_time?: string;
}

export interface Usage {
  exams?: number;
  homeworks?: number;
  tutorials?: number;
  schools?: number;
  m_schools?: number;
  f_schools?: number;
}

export interface UsageFilter {
  sex?: 'Male' | 'Female';
  province_id?: number;
  district_id?: number;
  school_type?: 'Governmental' | '';
  grade?: 'Elementary';
  school_id?: number;
}

export interface GradeCount {
  elementary: number;
  middle: number;
  high: number;
  was: number;
  tap: number;
}
