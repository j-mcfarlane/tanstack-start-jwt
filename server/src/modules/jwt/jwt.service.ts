import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import { JwtService as NestJWTService } from '@nestjs/jwt'

// Schemas
import { User } from '../user/user.schema'

@Injectable()
export class JwtService {
    constructor(
        private readonly config: ConfigService,
        private readonly _nestJWTService: NestJWTService,
    ) {}

    private _signToken(payload: { user: string }, refresh: boolean): Promise<string> {
        return this._nestJWTService.signAsync(payload, {
            secret: refresh ? this.config.get<string>('app.jwt_refresh') : this.config.get<string>('app.jwt_access'),
            expiresIn: refresh
                ? this.config.get<string>('app.jwt_refresh_expires_in')
                : this.config.get<string>('app.jwt_access_expires_in'),
            issuer: this.config.get<string>('app.jwt_issuer'),
        })
    }

    public async buildTokens(user: User): Promise<{ access: string; refresh: string }> {
        const [access, refresh] = await Promise.all([
            this._signToken(
                {
                    user: user._id.toString(),
                },
                false,
            ),
            this._signToken(
                {
                    user: user._id.toString(),
                },
                true,
            ),
        ])

        return { access, refresh }
    }

    public async verifyToken(token: string): Promise<{ access: string; refresh: string }> {
        try {
            const secret = this.config.get<string>('app.jwt_access')

            return await this._nestJWTService.verifyAsync(token, { secret })
        } catch (error) {
            throw error
        }
    }
}
