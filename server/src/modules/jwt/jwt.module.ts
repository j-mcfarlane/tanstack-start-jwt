import { JwtModule as NestJwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'

// Services
import { JwtService } from './jwt.service'

// Strategy
import { AccessStrategy } from './jwt-access.strategy'
import { RefreshStrategy } from './jwt-refresh.strategy'

// Modules
import { UserModule } from '../user'

@Module({
    imports: [NestJwtModule.register({}), UserModule],
    providers: [AccessStrategy, RefreshStrategy, JwtService],
    exports: [JwtService],
})
export class JwtModule {}
