import { Injectable } from '@nestjs/common';
import { TokenService } from '../../common/services/token service/token.service.js';

@Injectable()
export class AuthService {
  constructor(private readonly tokenService: TokenService) {}

  login() {
    const token = this.tokenService.generateToken({
      _id: 1,
      role: 'admin',
    });
    return {
      status: 'success',
      message: 'Login successful',
      token,
    };
  }
}
