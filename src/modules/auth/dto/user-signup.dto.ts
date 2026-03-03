import { IsString } from 'class-validator';
import { SignupEmailDto } from './signup-email.dto';

export class UserSignupDto extends SignupEmailDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;
}
