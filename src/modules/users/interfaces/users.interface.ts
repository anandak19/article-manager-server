export interface ICreateUser {
  firstName: string;
  lastName: string;
  passwordHash: string;
  email: string;
}

export interface IUser extends ICreateUser {
  id: string;
}
