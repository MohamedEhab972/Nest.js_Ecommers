import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import jwt from 'jsonwebtoken';
import { RoleEnum } from '../../enums/role.enum.js';
import { env } from '../../config/config.service.js';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: JwtPayload }>();

    const [flag, token] = request.headers.authorization?.split(' ') || [];

    if (flag === 'Basic') {
      const basicData = Buffer.from(token, 'base64').toString();
      let [email, password] = basicData.split(':');
    }

    if (flag !== 'Bearer') {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      const decoded = jwt.decode(token, { complete: true }) as JwtPayload;
      let signature = undefined;
      let audiance = undefined;

      switch (decoded.payload.role) {
        case RoleEnum.Admin:
          signature = env.jwtAdminSecret;
          audiance = 'Admin';
          break;

        case RoleEnum.User:
          signature = env.jwtUserSecret;
          audiance = 'User';
          break;

        default:
          throw new UnauthorizedException('Invalid token');
      }

      const decodedToken = jwt.verify(token, signature as string, {
        audience: audiance,
      });

      if (!decodedToken) {
        throw new BadRequestException('Invalid token');
      }
      request.user = decodedToken as JwtPayload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token', { cause: error });
    }
    return true;
  }
}
