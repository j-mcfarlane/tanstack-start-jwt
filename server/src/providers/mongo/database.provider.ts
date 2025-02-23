import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
    imports: [
        MongooseModule.forRootAsync({
            connectionName: 'db',
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('app.database'),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseProviderModule {}
