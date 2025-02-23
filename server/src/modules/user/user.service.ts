import { Injectable } from '@nestjs/common'

// User
import { User } from './user.schema'
import { UserFactory } from './user.factory'
import { UserRepository } from './user.repository'

// Utils
import { StringEncryptor } from '@/utils'

@Injectable()
export class UserService {
    constructor(
        private readonly _factory: UserFactory,
        private readonly _repository: UserRepository,
        private readonly _stringEncryptor: StringEncryptor,
    ) {}

    get register() {
        return {
            withEmail: async (dto: { email: string; password: string }): Promise<User> => {
                const candidate = await this._factory.register.withEmail(dto)

                return this._repository.create(candidate)
            },
        }
    }

    get retrieve() {
        return {
            byId: (id: string): Promise<User | null> => {
                return this._repository.retrieve(id)
            },
            byEmail: (email: string): Promise<User | null> => {
                return this._repository.findOne({ email: email })
            },
            list: async (): Promise<User[]> => {
                return await this._repository.list()
            },
            search: async (term: string): Promise<User[]> => {
                return await this._repository.search({
                    $or: [{ email: { $regex: term, $options: 'i' } }],
                })
            },
        }
    }

    get update() {
        return {
            tokens: {
                logout: async (id: string): Promise<User> => {
                    return await this._repository.update(id, {
                        refresh: null,
                    })
                },

                refresh: async (id: string, refresh: string): Promise<User> => {
                    return this._repository.update(id, {
                        refresh: await this._stringEncryptor.generate(refresh),
                    })
                },
            },
        }
    }
}
