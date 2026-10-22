import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { TokenService } from '../../common/services/token service/token.service.js';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokenService],
})
export class AuthModule {}
