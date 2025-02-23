import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Strategy, ExtractJwt } from 'passport-jwt'

// Service
import { UserService } from '../user/user.service'

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        config: ConfigService,
        private _userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>('app.jwt_access'),
        })
    }

    async validate(payload: { user: string }) {
        const user = this._userService.retrieve.byId(payload.user)

        return {
            user,
        }
    }
}
