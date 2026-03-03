import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Scope } from '@nestjs/common';
import { IPayload } from '@modules/users/interfaces/users.interface';

@Injectable({ scope: Scope.REQUEST })
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log('jwt stargegy initialized');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() as () => string | null,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret',
    });
  }

  validate(payload: IPayload) {
    return { userId: payload.id, email: payload.email };
  }
}
