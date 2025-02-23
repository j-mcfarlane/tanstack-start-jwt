import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { StringEncryptor } from '@/utils'
import { UserFactory } from './user.factory'
import { UserRepository } from './user.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './user.schema'
import { UserController } from './user.controller'

@Module({
    imports: [MongooseModule.forFeature([{ name: 'user', schema: UserSchema }], 'db')],
    controllers: [UserController],
    providers: [StringEncryptor, UserFactory, UserRepository, UserService],
    exports: [UserService],
})
export class UserModule {}
