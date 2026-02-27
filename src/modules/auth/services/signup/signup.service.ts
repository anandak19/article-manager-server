import { CacheService } from '@core/lib/cache/cache.service';
import { EmailService } from '@core/lib/email/email.service';
import { OtpService } from '@core/lib/otp/otp.service';
import { OtpTimeResponseDto } from '@modules/auth/dto/otp-time.dto';
import { UserSignupDto } from '@modules/auth/dto/user-signup.dto';
import { VerfiyOtpDto } from '@modules/auth/dto/verify-otp.dto';
import { ISignupService } from '@modules/auth/interfaces/auth-services.interface';
import type {
  IPendingUserService,
  IUserService,
} from '@modules/users/interfaces/users-services.interface';
import { USER_TOKENS } from '@modules/users/users.tokens';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { generateOtpHtml } from '@shared/constants/email/email-template';
import { IBaseResponse } from '@shared/interfaces/http-response.interface';

@Injectable()
export class SignupService implements ISignupService {
  constructor(
    private _cacheService: CacheService,
    private _otpService: OtpService,
    private _emailService: EmailService,
    @Inject(USER_TOKENS.USER_SERVICE) private _userService: IUserService,
    @Inject(USER_TOKENS.PENDING_USER_SERVICE) private _pendingUser: IPendingUserService,
  ) {}
  async varifyEmail(userData: UserSignupDto): Promise<IBaseResponse> {
    // varify user exists in users collection with email
    const isExists = await this._userService.isEmailExists(userData.email);
    if (isExists) {
      throw new ConflictException('User Exists');
    }

    // save user to pending users
    console.log('vafiy data service');
    await this._pendingUser.create(userData);

    const otp = this._otpService.generateOtp();
    // send otp as email
    await this._emailService.sendEmail({
      html: generateOtpHtml(otp),
      recipient: userData.email,
      subject: 'Varify Your Email',
    });
    // save otp
    await this._otpService.storeOtp(userData.email, otp);

    /**
     * varify the user existance in users collection with email
     *      if yes return error
     * check if the user is exists in pending_users collection with email
     *      if yes, update the whole data and is ttl
     * create a otp
     * send otp to users email
     * return message that says otp send
     */
    return { message: 'OTP Send' };
  }

  async verifyOtp(dto: VerfiyOtpDto): Promise<IBaseResponse> {
    /**
     * check and get the user exists in the pending user collection - with email
     *      if not found reutrn error
     * check if the otp exists in cache and is correct - with email
     *      if not correct / not found return error
     * call the user service to create new user with the data we got
     * return the message
     *
     * i will get back to u
     */
    const userData = await this._pendingUser.findOne(dto.email);
    if (!userData) {
      throw new NotFoundException('User details not found, Try agin!');
    }

    const isOtpCorrect = await this._otpService.varifyOtp(dto.email, dto.otp);

    if (!isOtpCorrect) {
      throw new BadRequestException('Invalid OTP');
    }

    return await this._userService.create(userData);
  }

  async getOtpTimeLeft(email: string): Promise<OtpTimeResponseDto> {
    const timeLeft = await this._otpService.getOtpTimeLeft(email);
    if (!timeLeft) {
      throw new NotFoundException('Otp Expired');
    }
    return { timeLeft };
  }

  async resendOtp(email: string): Promise<IBaseResponse> {
    const timeLeft = await this._otpService.getOtpTimeLeft(email);
    if (timeLeft) {
      throw new BadRequestException('Pleae wait till the timer end');
    }

    const userData = await this._pendingUser.findOne(email);

    if (!userData) {
      throw new BadRequestException('Signup session expired');
    }

    const otp = this._otpService.generateOtp();
    try {
      await this._emailService.sendEmail({
        recipient: userData.email,
        subject: 'Varify Your Email',
        html: generateOtpHtml(otp),
      });

      await this._otpService.storeOtp(email, otp);

      return { message: 'Otp re send' };
    } catch (err) {
      console.error('Error in otp send:', err);
      throw new InternalServerErrorException();
    }
  }
}
