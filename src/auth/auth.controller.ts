import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthCredentialsDto } from './dtos/auth-credentials-dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }
  @ApiResponse({ status: HttpStatus.CREATED  })
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @ApiResponse({ status: 200, type: 'string'  })
  @ApiResponse({ status: 401, type: 'string'  })
  @Post('signin')
  @HttpCode(HttpStatus.CREATED)
  async signIn(@Body() loginDto: LoginDto): Promise<string> {
    return this.authService.signIn(loginDto);
  }
}
