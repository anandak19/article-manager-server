import { Injectable } from '@nestjs/common';
import { IAuthService } from '../interfaces/auth-services.interface';
import { CacheService } from '@core/lib/cache/cache.service';
import { IBaseResponse } from '@shared/interfaces/http-response.interface';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private _cacheService: CacheService) {}

  login(dto: LoginUserDto): Promise<IBaseResponse> {
    console.log(dto);
    throw new Error('Method not implemented.');
  }
}
