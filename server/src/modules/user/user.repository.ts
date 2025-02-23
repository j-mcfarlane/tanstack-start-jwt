import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

// Generic Repo
import { MongoRepository } from '@/providers/mongo/mongo.repository'

// Schema
import { UserDocument as Document } from './user.schema'

@Injectable()
export class UserRepository extends MongoRepository<Document> {
    constructor(@InjectModel('user', 'db') model: Model<Document>) {
        super(model)
    }
}
