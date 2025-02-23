import { registerAs } from '@nestjs/config'

export const appConfig = registerAs('app', () => ({
    env: process.env.NODE_ENV || process.env.APP_ENV,
    port: process.env.PORT || process.env.APP_PORT,
    database: process.env.DATABASE,
    jwt_access: process.env.JWT_ACCESS,
    jwt_refresh: process.env.JWT_REFRESH,
    jwt_issuer: process.env.JWT_ISSUER,
}))
