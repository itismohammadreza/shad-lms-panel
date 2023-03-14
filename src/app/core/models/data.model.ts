export interface LoginCredentials {
  username: string;
  password: string;
}

export interface UserProfile {
  id?: string;
  username: string;
  email: string;
  phone_number: string;
}

export interface UserItem {
  id?: string;
  username: string;
  password: string;
  email: string;
  phone_number: string;
  permission: string;
  status: boolean;
  last_visit?: string;
}
