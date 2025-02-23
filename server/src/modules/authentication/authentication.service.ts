import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

// Services
import { JwtService } from '@/modules/jwt/jwt.service'
import { UserService } from '../user/user.service'

// Schemas
import { User } from '../user/user.schema'

// Utils
import { StringEncryptor } from '@/utils'

@Injectable()
export class AuthenticationService {
    constructor(
        protected readonly config: ConfigService,
        protected readonly _jwtService: JwtService,
        protected readonly _stringEncryptor: StringEncryptor,
        protected readonly _userService: UserService,
    ) {}

    private async _tokens(user: User): Promise<{ access: string; refresh: string }> {
        try {
            const tokens = await this._jwtService.buildTokens(user)

            await this._userService.update.tokens.refresh(user._id, tokens.refresh)

            return tokens
        } catch (err) {
            throw new InternalServerErrorException({
                message: 'Server error generating tokens',
                details: [],
            })
        }
    }

    async login(dto: { email: string; password: string }): Promise<{ access: string; refresh: string }> {
        try {
            const user = await this._userService.retrieve.byEmail(dto.email)

            if (!user) {
                throw new NotFoundException({
                    message: 'No user',
                    details: [],
                })
            }

            const isValid = await this._stringEncryptor.compare(dto.password, user.password)

            if (!isValid) {
                throw new UnauthorizedException({
                    message: 'Server error',
                    details: [],
                })
            }

            return await this._tokens(user)
        } catch (err) {
            if (err instanceof ConflictException) {
                throw new BadRequestException(err)
            }

            throw new InternalServerErrorException({
                message: 'Server Error',
                details: [],
            })
        }
    }

    async logout(payload: { user: string }): Promise<User> {
        return await this._userService.update.tokens.logout(payload.user)
    }

    async register(dto: { email: string; password: string }): Promise<{ access: string; refresh: string }> {
        try {
            const exists = await this._userService.retrieve.byEmail(dto.email)

            if (exists) {
                throw new ConflictException({
                    message: 'user already exists',
                    details: [],
                })
            }

            const user = await this._userService.register.withEmail(dto)

            return await this._tokens(user)
        } catch (err) {
            if (err instanceof ConflictException) {
                throw new BadRequestException(err)
            }

            throw new InternalServerErrorException({
                message: 'Server Error',
                details: [],
            })
        }
    }

    async refresh(payload: { user: string; refresh: string }): Promise<{ access: string; refresh: string }> {
        try {
            const user = await this._userService.retrieve.byId(payload.user)

            if (!user) {
                throw new NotFoundException({
                    message: 'No user',
                    details: [],
                })
            }

            const isValid = await this._stringEncryptor.compare(payload.refresh, user.refresh)

            if (!isValid) {
                throw new BadRequestException({
                    message: 'Token Invalid',
                    details: [],
                })
            }

            return await this._tokens(user)
        } catch (err) {
            if (err instanceof ConflictException) {
                throw new BadRequestException(err)
            }

            throw new InternalServerErrorException({
                message: 'Server Error',
                details: [],
            })
        }
    }
}
