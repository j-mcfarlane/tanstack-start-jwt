import { Module } from '@nestjs/common'
import { JwtModule } from '@/modules/jwt'

// Authentication
import { AuthenticationService } from './authentication.service'
import { AuthenticationController } from './authentication.controller'

// Utils
import { StringEncryptor } from '@/utils'

// Modules
import { UserModule } from '../user'

@Module({
    imports: [JwtModule, UserModule],
    controllers: [AuthenticationController],
    providers: [AuthenticationService, StringEncryptor],
    exports: [AuthenticationService],
})
export class AuthenticationModule {}
