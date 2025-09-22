export interface UserResponse {
  user: User;
  token: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailValidated: boolean;
  password: string;
  createdAt: Date;
}

export interface userData {
  name: string;
  email: string;
  password: string;
  secondPassword: string;
}
