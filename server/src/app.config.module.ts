import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'

// Configs
import { appConfig } from '@/app.config'

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig],
        }),
    ],
})
export class ConfigModule {}
