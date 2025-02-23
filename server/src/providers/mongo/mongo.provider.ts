import { Module } from '@nestjs/common'

// Database
import { DatabaseProviderModule } from './database.provider'

@Module({
    imports: [DatabaseProviderModule],
})
export class MongoDatabaseProviderModule {}
