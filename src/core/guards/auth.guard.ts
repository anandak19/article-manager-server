import { COOKIE_KEY } from '@core/lib/cookie/cookie.service';
import { AUTH_TOKENS } from '@modules/auth/auth.tokens';
import type { ITokenService } from '@modules/auth/interfaces/auth-services.interface';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AUTH_TOKENS.AUTH_TOKEN_SERVICE) private _tokenService: ITokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // take the request
    const request = context.switchToHttp().getRequest<Request>();

    // get access token from cookie
    const token = request.cookies?.[COOKIE_KEY] as string;

    // if no token found in cookie
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // extract paylod from token
      const payload = await this._tokenService.verifyToken(token);
      // attach payload to request
      // here assing the payload to req.user
      request.user = payload;
    } catch {
      throw new UnauthorizedException();
    }
    // continue request to contoller :)
    return true;
  }
}
