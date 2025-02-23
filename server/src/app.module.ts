import { Module } from '@nestjs/common'

// Core Modules
import { ConfigModule } from './app.config.module'
import { ProvidersModule } from './providers'

// Middlewares
import { UserModule } from './modules/user'

@Module({
    imports: [
        // Core
        ConfigModule,
        ProvidersModule,

        // Modules
        UserModule,
    ],
})
export class AppModule {}
