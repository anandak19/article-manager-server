import { AppConfig } from '@config/app.config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

export const COOKIE_KEY = 'access-token';

@Injectable()
export class CookieService {
  private readonly cookieMaxAge = 60 * 60 * 24 * 7; // 7d
  constructor(private configService: ConfigService<AppConfig>) {}

  setCookie(res: Response, key: string, value: string, maxAgeSeconds: number = this.cookieMaxAge) {
    const environment = this.configService.get<string>('NODE_ENV')!;
    const isProd = environment === 'production';

    res.cookie(key, value, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      path: '/',
      maxAge: maxAgeSeconds * 1000,
    });
  }

  clearCookie(res: Response) {
    const isProd = this.configService.get('NODE_ENV') === 'production';

    res.clearCookie(COOKIE_KEY, {
      httpOnly: true,
      secure: isProd,
      path: '/',
      sameSite: isProd ? 'none' : 'lax',
    });
  }
}
