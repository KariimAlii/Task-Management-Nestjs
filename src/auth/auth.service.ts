import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { AuthCredentialsDto } from './dtos/auth-credentials-dto';
import { LoginDto } from './dtos/login-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(loginDto: LoginDto): Promise<string> {
    const { username, password } = loginDto;
    const user = await this.userRepository.findUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Login Credentials invalid'); // status code 401 UnAuthorized
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(isMatch)
      return 'success';
    else
      throw new UnauthorizedException('Login Credentials invalid');
  }
}
