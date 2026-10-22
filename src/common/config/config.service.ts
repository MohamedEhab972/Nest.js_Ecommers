import dotenv from 'dotenv';

dotenv.config({ path: ['.env.dev', '.env.prod'] });

export const env = {
  get port() {
    return process.env.PORT || 3000;
  },
  get databaseUrl() {
    return process.env.MONGO_URI || '';
  },
  get salt() {
    return process.env.SALT || '';
  },
  get jwtExpiresIn() {
    return process.env.JWT_EXPIRES_IN || '';
  },
  get jwtRefreshExpiresIn() {
    return process.env.JWT_REFRESH_EXPIRES_IN || '';
  },
  get jwtUserSecret() {
    return process.env.USER_JWT_SECRET || '';
  },
  get jwtAdminSecret() {
    return process.env.ADMIN_JWT_SECRET || '';
  },
  get jwtAdminRefreshSecret() {
    return process.env.ADMIN_REFRESH_SECRET || '';
  },
  get jwtUserRefreshSecret() {
    return process.env.USER_REFRESH_SECRET || '';
  },
  get nodeEnv() {
    return process.env.NODE_ENV || 'development';
  },
  get serverUri() {
    return process.env.SERVER_URI || '';
  },
  get googleEmail() {
    return process.env.GOOGLE_EMAIL || '';
  },
  get googlePassword() {
    return process.env.GOOGLE_PASSWORD || '';
  },
  get googleClientId() {
    return process.env.GOOGLE_CLIENT_ID || '';
  },
  get redisUrl() {
    return process.env.REDIS_URL || '';
  },
  get corsOrigin() {
    return (process.env.CORS_ORIGIN || '').split(',').filter(Boolean);
  },
  get awsAccessKey() {
    return process.env.AWS_ACCESS_KEY || '';
  },
  get awsSecretKey() {
    return process.env.AWS_SECRIT_KEY || '';
  },
  get awsBucketName() {
    return process.env.AWS_BOCKET_NAME || '';
  },
};
