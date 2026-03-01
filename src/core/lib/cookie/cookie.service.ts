import { AppConfig } from '@config/app.config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

export const COOKIE_KEY = 'refresh-token';

@Injectable()
export class CookieService {
  constructor(private configService: ConfigService<AppConfig>) {}

  setCookie(res: Response, key: string, value: string, maxAgeSeconds: number = 3600) {
    const isProd = this.configService.get('NODE_ENV') === 'production';

    res.cookie(key, value, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'none',
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
      sameSite: 'none',
    });
  }
}
