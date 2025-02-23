import { Module } from '@nestjs/common'

// Core Modules
import { ConfigModule } from './app.config.module'
import { ProvidersModule } from './providers'

// Middlewares
import { AuthenticationModule } from './modules/authentication'
import { JwtModule } from './modules/jwt'
import { UserModule } from './modules/user'

@Module({
    imports: [
        // Core
        ConfigModule,
        ProvidersModule,

        // Modules
        AuthenticationModule,
        JwtModule,
        UserModule,
    ],
})
export class AppModule {}
