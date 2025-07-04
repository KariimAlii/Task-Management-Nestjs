import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { AuthCredentialsDto } from './dtos/auth-credentials-dto';
import { LoginDto } from './dtos/login-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginVM } from './vms/loginVM';
import { JwtPayload } from './models/jwt-payload';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private configService: ConfigService
  )
  {}

  getDbHost(): string | undefined {
    return this.configService.get<string>('DB_HOST');
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(loginDto: LoginDto): Promise<LoginVM> {
    const { username, password } = loginDto;
    const user = await this.userRepository.findUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Login Credentials invalid'); // status code 401 UnAuthorized
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      throw new UnauthorizedException('Login Credentials invalid');
    }
    const payload: JwtPayload = {
      username: user.username,
      email: user.email
    }
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };  // you can return => Object.assign(new LoginVM(), { accessToken });
  }
}
