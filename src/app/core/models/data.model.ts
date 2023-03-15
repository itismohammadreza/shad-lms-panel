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
