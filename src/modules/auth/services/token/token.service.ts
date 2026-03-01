import { AppConfig } from '@config/app.config';
import { IPayload } from '@modules/users/interfaces/users.interface';
import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { StringValue } from 'ms';

@Injectable()
export class TokenService {
  private readonly _accessTokenTime = '15m';
  private JWT_SECRET: string;

  constructor(
    private _jwtService: JwtService,
    private _configService: ConfigService<AppConfig>,
  ) {
    this.JWT_SECRET = _configService.get('JWT_SECRET')!;
  }

  async getNewAccessToken(payload: IPayload): Promise<string> {
    return await this._getToken(payload, this._accessTokenTime);
  }

  async verifyToken(token: string): Promise<IPayload> {
    try {
      const payload = await this._jwtService.verifyAsync<IPayload>(token, {
        secret: this.JWT_SECRET,
      });

      if (!payload) {
        throw new ForbiddenException('Auth Session Expired');
      }

      return payload;
    } catch {
      throw new ForbiddenException('Auth Session Expired');
    }
  }

  /**
   * Return new singned jwt token
   * @param {IPayload} payload - payload for token
   * @param {StringValue | number} expiresIn - The token's expiration duration.
   * @returns {Promise<string>} A promise that resolves to the signed JWT token.
   * */
  private async _getToken(
    payload: IPayload,
    expiresIn: StringValue | number = this._accessTokenTime,
  ): Promise<string> {
    console.log('Payload to create token', payload);
    try {
      const options: JwtSignOptions = {
        secret: this.JWT_SECRET,
        expiresIn,
      };
      return await this._jwtService.signAsync(payload, options);
    } catch {
      throw new InternalServerErrorException('Token Generation Faild');
    }
  }
}
