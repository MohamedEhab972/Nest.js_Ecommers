import { Injectable, UnauthorizedException } from '@nestjs/common';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { env } from '../../config/config.service.js';
import { RoleEnum } from '../../enums/role.enum.js';

@Injectable()
export class TokenService {
  constructor() {}

  generateToken(payload: Record<string, any>) {
    let signature = undefined;
    let audience = undefined;
    let refresherSignature = undefined;
    switch (payload.role) {
      case RoleEnum.Admin:
        signature = env.jwtAdminSecret as string;
        refresherSignature = env.jwtAdminRefreshSecret as string;
        audience = 'Admin';
        break;

      default:
        signature = env.jwtUserSecret;
        refresherSignature = env.jwtUserRefreshSecret;
        audience = 'User';
        break;
    }

    const accessToken = jwt.sign(payload, signature as string, {
      expiresIn: env.jwtExpiresIn as NonNullable<jwt.SignOptions['expiresIn']>,
      audience,
    });

    const refreshToken = jwt.sign(payload, refresherSignature as string, {
      expiresIn: env.jwtRefreshExpiresIn as NonNullable<
        jwt.SignOptions['expiresIn']
      >,
      audience,
    });
    return { accessToken, refreshToken };
  }

  decodedAccessToken(token: string) {
    try {
      let decoded = jwt.decode(token, { complete: true }) as JwtPayload;
      if (!decoded) {
        throw new UnauthorizedException('Invalid token');
      }

      let signature = undefined;
      switch (decoded.payload.role) {
        case RoleEnum.Admin:
          signature = env.jwtAdminSecret;
          break;
        default:
          signature = env.jwtUserSecret;
          break;
      }
      let decodedToken = jwt.verify(token, signature as string);
      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid token', { cause: error });
    }
  }

  decodedRefreshToken(token: string) {
    try {
      let decoded = jwt.decode(token, { complete: true }) as JwtPayload;
      if (!decoded) {
        throw new UnauthorizedException('Invalid token');
      }

      let signature = undefined;
      switch (decoded.payload.role) {
        case RoleEnum.Admin:
          signature = env.jwtAdminRefreshSecret;
          break;
        default:
          signature = env.jwtUserRefreshSecret;
          break;
      }
      let decodedToken = jwt.verify(token, signature as string);
      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid token', { cause: error });
    }
  }
}
