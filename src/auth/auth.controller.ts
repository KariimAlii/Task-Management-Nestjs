import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthCredentialsDto } from './dtos/auth-credentials-dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login-dto';
import { LoginVM } from './vms/loginVM';

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

  @ApiResponse({ status: HttpStatus.OK, type: LoginVM  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: String  })
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() loginDto: LoginDto): Promise<LoginVM> {
    return this.authService.signIn(loginDto);
  }

  @ApiResponse({ status: HttpStatus.OK, type: String  })
  @Get('dbhost')
  @HttpCode(HttpStatus.OK)
  getDbHost() {
    return this.authService.getDbHost();
  }
}
