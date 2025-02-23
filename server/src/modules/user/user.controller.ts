import { Controller, Get, UseGuards } from '@nestjs/common'

// Service
import { UserService } from './user.service'

// Utils
import { AuthorizationGuard, GetPayload } from '@/utils'
import { User } from './user.schema'

@Controller('users')
export class UserController {
    constructor(private _service: UserService) {}

    @UseGuards(AuthorizationGuard)
    @Get('me')
    async current(@GetPayload() payload: { user: string }): Promise<{ data: User; success: boolean }> {
        const data = await this._service.retrieve.byId(await payload.user)

        return {
            data,
            success: true,
        }
    }
}
