import { CacheService } from '@core/lib/cache/cache.service';
import { ISignupService } from '@modules/auth/interfaces/auth-services.interface';
import { Injectable } from '@nestjs/common';
import { IBaseResponse } from '@shared/interfaces/http-response.interface';

@Injectable()
export class SignupService implements ISignupService {
  constructor(private _cacheService: CacheService) {}
  async varifyEmail(): Promise<IBaseResponse> {
    // varify user exists in users collection with email

    /**
     * varify the user existance in users collection with email
     *      if yes return error
     * check if the user is exists in pending_users collection with email
     *      if yes, update the whole data and is ttl
     * create a otp
     * send otp to users email
     * return message that says otp send
     */
    await this._cacheService.set('hi', 'hellop', '2m');
    return { message: 'done man' };
  }

  async verifyOtp(): Promise<IBaseResponse> {
    /**
     * check and get the user exists in the pending user collection - with email
     *      if not found reutrn error
     * check if the otp exists in cache and is correct - with email
     *      if not correct / not found return error
     * call the user service to create new user with the data we got
     * return the message
     */
    const result = await this._cacheService.get<string>('hi');
    return { message: result || 'not found' };
  }
}
