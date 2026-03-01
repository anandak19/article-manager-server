export interface ICreateUser {
  firstName: string;
  lastName: string;
  passwordHash: string;
  email: string;
}

export interface IUser extends ICreateUser {
  id: string;
}

export type IUserRes = Omit<IUser, 'passwordHash'>;

export type IPayload = Omit<IUser, 'lastName' | 'passwordHash'>;
