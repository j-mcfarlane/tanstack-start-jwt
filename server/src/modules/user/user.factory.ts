import { Injectable } from '@nestjs/common'

// User
import { User } from './user.schema'

// Utils
import { StringEncryptor } from '@/utils'

@Injectable()
export class UserFactory {
    constructor(private readonly _stringEncryptor: StringEncryptor) {}

    get register() {
        return {
            withEmail: async (dto: { email: string; password: string }): Promise<User> => {
                const user = new User()

                user.email = dto.email
                user.password = await this._stringEncryptor.generate(dto.password)
                user.refresh = null

                return user
            },
        }
    }
}
