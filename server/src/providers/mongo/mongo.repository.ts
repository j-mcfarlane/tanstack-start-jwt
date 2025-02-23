import { FilterQuery, Model, ModifyResult, UpdateQuery, AnyKeys, PipelineStage } from 'mongoose'

// Interface
import { MongoRepositoryInterface } from '@/providers/mongo/mongo.interface'

export class MongoRepository<T extends Document> implements MongoRepositoryInterface<T> {
    constructor(
        private readonly _repository: Model<T>,
        private _populateOnFind: string[] = [],
    ) {}

    async aggregate(pipeline: PipelineStage[]): Promise<T[]> {
        return await this._repository.aggregate(pipeline).exec()
    }

    async create(data: AnyKeys<T>): Promise<T> {
        return await this._repository.create(data)
    }

    async delete(id: string): Promise<ModifyResult<T>> {
        const result = await this._repository.findByIdAndDelete(id).exec()

        if (result) {
            return {
                value: result,
                ok: 1,
            }
        } else {
            return {
                value: null,
                ok: 0,
            }
        }
    }

    async findOne(query: FilterQuery<T>): Promise<T | null> {
        const entity = await this._repository.findOne(query)

        return entity ? await entity.populate(this._populateOnFind) : null
    }

    async list(): Promise<T[]> {
        return await this._repository.find().limit(100).populate(this._populateOnFind).exec()
    }

    async paginate(
        query: FilterQuery<T> = {},
        page: number = 1,
        limit: number = 50,
        sort: Record<string, 1 | -1> = {},
    ): Promise<{ data: T[]; count: number; pages: number; page: number }> {
        const skip = (page - 1) * limit

        const [data, count] = await Promise.all([
            this._repository.find(query).skip(skip).limit(limit).sort(sort).populate(this._populateOnFind).exec(),
            this._repository.countDocuments(query).exec(),
        ])

        return {
            data,
            count,
            pages: Math.ceil(count / limit),
            page,
        }
    }

    async retrieve(id: string): Promise<T | null> {
        const entity = await this._repository.findById(id)

        return entity ? await entity.populate(this._populateOnFind) : null
    }

    async search(query: FilterQuery<T>): Promise<T[]> {
        return await this._repository.find(query).populate(this._populateOnFind).exec()
    }

    async update(id: string, update: UpdateQuery<T>): Promise<T> {
        return (await this._repository
            .findByIdAndUpdate(id, update, {
                new: true,
                timestamps: true,
            })
            .populate(this._populateOnFind)
            .exec()) as T
    }

    async updateByQuery(query: FilterQuery<T>, update: UpdateQuery<T>): Promise<T | null> {
        return (await this._repository
            .findOneAndUpdate(query, update)
            .populate(this._populateOnFind)
            .exec()) as T | null
    }

    async updateMany(ids: string[], update: UpdateQuery<T>): Promise<T[]> {
        const updateResult = await this._repository.updateMany({ _id: { $in: ids } }, update).exec()

        if (updateResult.modifiedCount === 0) {
            return []
        }

        const updatedDocuments = (await this._repository
            .find({
                _id: { $in: ids },
            })
            .populate(this._populateOnFind)
            .exec()) as T[]

        return updatedDocuments
    }

    async upsert(query: FilterQuery<T>, update: UpdateQuery<T>): Promise<T> {
        return (await this._repository
            .findOneAndUpdate(query, update, {
                new: true,
                timestamps: true,
                upsert: true,
            })
            .exec()) as T
    }
}
