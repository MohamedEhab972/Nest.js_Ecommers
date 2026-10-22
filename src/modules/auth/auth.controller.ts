import {
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoggingInterceptor } from '../../logging/logging.interceptor.js';
import { AuthGuard } from '../../common/guard/auth/auth.guard.js';

@Controller('auth')
// @UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard)
  async login() {
    const data = await this.authService.login();
    return {
      status: 'success',
      data,
    };
  }

  @Post('register')
  register() {
    console.log('you are register now');

    return {
      status: 'success',
      message: 'Registration successful',
    };
  }
}
