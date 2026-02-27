import { IsString } from 'class-validator';

export class VerfiyOtpDto {
  @IsString()
  otp: string;

  @IsString()
  email: string;
}
