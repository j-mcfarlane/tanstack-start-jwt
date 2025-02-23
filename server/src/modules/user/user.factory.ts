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
            withEmail: (dto: { email: string; password: string }): User => {
                const user = new User()

                user.email = dto.email
                user.password = this._stringEncryptor.hash(dto.password)
                user.refresh = null

                return user
            },
        }
    }
}
