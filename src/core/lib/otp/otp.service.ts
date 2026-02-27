import { Injectable } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class OtpService {
  constructor(private readonly _cacheService: CacheService) {}

  // generate otp
  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000)
      .toString()
      .substring(0, 4);
  }

  // save otp in session 60sec
  async storeOtp(email: string, otp: string, ttl = 1000 * 60 * 2): Promise<void> {
    await this._cacheService.set(`otp:${email}`, otp, ttl);
  }

  async getOtpTimeLeft(email: string) {
    return await this._cacheService.getReminingTime(`otp:${email}`);
  }

  // varify otp
  async varifyOtp(email: string, otp: string): Promise<boolean> {
    const storedOtp = await this._cacheService.get(`otp:${email}`);
    return storedOtp === otp;
  }
}
