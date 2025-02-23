import { Module } from '@nestjs/common'

// Core Modules
import { ConfigModule } from './app.config.module'
import { ProvidersModule } from './providers'

// Middlewares
import { UserModule } from './modules/user'
import { JwtModule } from './modules/jwt'

@Module({
    imports: [
        // Core
        ConfigModule,
        ProvidersModule,

        // Modules
        JwtModule,
        UserModule,
    ],
})
export class AppModule {}
