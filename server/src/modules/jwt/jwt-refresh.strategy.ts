import { PassportStrategy } from '@nestjs/passport'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import { Strategy, ExtractJwt } from 'passport-jwt'

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>('app.jwt_refresh'),
            passReqToCallback: true,
        })
    }

    validate(req: Request, payload: { user: string }): { user: string; refresh: string } {
        const refresh = req?.get('authorization')?.replace('Bearer', '').trim()

        if (!refresh) {
            throw new ForbiddenException('Refresh token malformed')
        }

        return {
            ...payload,
            refresh,
        }
    }
}
