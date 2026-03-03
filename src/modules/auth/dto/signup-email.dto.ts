import { IsString } from 'class-validator';

export class SignupEmailDto {
  @IsString()
  email: string;
}
