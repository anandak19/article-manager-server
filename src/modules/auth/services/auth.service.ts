import { Inject, Injectable } from '@nestjs/common';
import type { IAuthService, ITokenService } from '../interfaces/auth-services.interface';
import { CacheService } from '@core/lib/cache/cache.service';
import { IBaseResponse } from '@shared/interfaces/http-response.interface';
import { USER_TOKENS } from '@modules/users/users.tokens';
import type { IUserService } from '@modules/users/interfaces/users-services.interface';
import { IPayload, IUserRes } from '@modules/users/interfaces/users.interface';
import type { Response } from 'express';
import { LoginUserDto } from '../dto/login-user.dto';
import { COOKIE_KEY, CookieService } from '@core/lib/cookie/cookie.service';
import { AUTH_TOKENS } from '../auth.tokens';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private _cacheService: CacheService,
    private _cookieService: CookieService,
    @Inject(USER_TOKENS.USER_SERVICE) private _userService: IUserService,
    @Inject(AUTH_TOKENS.AUTH_TOKEN_SERVICE) private _tokenService: ITokenService,
  ) {
    console.log('auth service init');
  }

  async login(loginDto: LoginUserDto, res: Response): Promise<IBaseResponse> {
    const user = await this._userService.authenticateUser(loginDto.email, loginDto.password);
    const payload = this._getPayload(user);
    await this._setTokenInCookie(res, payload);
    return { message: 'Login Success' };
  }

  logout(res: Response): IBaseResponse {
    this._cookieService.clearCookie(res);
    return { message: 'Logout Success' };
  }

  // used for passport auth, not using now
  async validateLocalUser(email: string, password: string): Promise<IUserRes> {
    return await this._userService.authenticateUser(email, password);
  }

  private async _setTokenInCookie(res: Response, payload: IPayload) {
    const token = await this._tokenService.getNewAccessToken(payload);
    return this._cookieService.setCookie(res, COOKIE_KEY, token);
  }

  private _getPayload(user: IUserRes): IPayload {
    return {
      email: user.email,
      firstName: user.firstName,
      id: user.id,
    };
  }
}
