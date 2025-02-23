import { Module } from '@nestjs/common'

// Modules
import { MongoDatabaseProviderModule } from './mongo'

@Module({
    imports: [MongoDatabaseProviderModule],
})
export class ProvidersModule {}
