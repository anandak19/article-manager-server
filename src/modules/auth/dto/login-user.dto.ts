import { IsString } from 'class-validator';
import { SignupEmailDto } from './signup-email.dto';

export class LoginUserDto extends SignupEmailDto {
  @IsString()
  password: string;
}
