import { Body, Controller, Post, UseGuards } from '@nestjs/common'

// Services
import { AuthenticationService } from './authentication.service'
import { AuthorizationGuard, GetPayload, RefreshGuard } from '@/utils'
import { User } from '../user/user.schema'

@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly _service: AuthenticationService) {}

    @Post('login')
    async login(@Body() dto: { email: string; password: string }): Promise<{
        data: {
            access: string
            refresh: string
        }
        success: boolean
    }> {
        const data = await this._service.login(dto)

        return {
            data,
            success: true,
        }
    }

    @Post('register')
    async register(@Body() dto: { email: string; password: string }): Promise<{
        data: {
            access: string
            refresh: string
        }
        success: boolean
    }> {
        const data = await this._service.register(dto)

        return {
            data,
            success: true,
        }
    }

    @UseGuards(AuthorizationGuard)
    @Post('logout')
    async logout(@GetPayload() payload: { user: string }): Promise<{ data: null; success: boolean }> {
        const user = (await payload.user) as unknown as User

        await this._service.logout({ user: user._id })

        return {
            data: null,
            success: true,
        }
    }

    @UseGuards(RefreshGuard)
    @Post('refresh')
    async refresh(
        @GetPayload() payload: { user: string; refresh: string },
    ): Promise<{ data: { access: string; refresh: string }; success: boolean }> {
        const data = await this._service.refresh(payload)

        return {
            data,
            success: true,
        }
    }
}
