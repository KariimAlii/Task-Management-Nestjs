import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // constructor(private readonly userRepository: UserRepository) {
  //   super({
  //
  //   });
  // }
  validate(...args: any[]): unknown {
    throw new Error('Method not implemented.');
  }
}