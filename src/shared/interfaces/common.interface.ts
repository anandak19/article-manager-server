import { IPayload } from '@modules/users/interfaces/users.interface';

export interface IAuthenticatedRequest extends Request {
  user: IPayload; // FIX ME : change to correct type
}
