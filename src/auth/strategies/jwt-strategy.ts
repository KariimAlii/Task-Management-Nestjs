import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { UserRepository } from '../repositories/user.repository';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../models/jwt-payload';
import { User } from '../../tasks/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepository: UserRepository,
    private configService: ConfigService
  ) {
    super({
      // secretOrKey: configService.get<string>('JWT_SECRET') || '',
      secretOrKey: '$$$$MySecret$$$$$',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()  // Authorization: Bearer fuefih.r75fge9fu.fhe89fhfe9
    });
  }
  async validate(payload: JwtPayload): Promise<User | null> {
    // what we wanna do after the token is valid
    const { username, email } = payload;

    const user: User | null = await this.userRepository.findUserByUsername(username);

    if(!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}