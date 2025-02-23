import { FilterQuery, ModifyResult, PipelineStage, UpdateQuery } from 'mongoose'

export abstract class MongoRepositoryInterface<T> {
    abstract aggregate(pipeline: PipelineStage[]): Promise<T[]>
    abstract create(document: T): Promise<T>
    abstract delete(id: string): Promise<ModifyResult<T>>
    abstract findOne(query: FilterQuery<T>): Promise<T | null>
    abstract list(): Promise<T[]>
    abstract paginate(
        query: FilterQuery<T>,
        page: number,
        limit: number,
        sort?: any,
    ): Promise<{ data: T[]; count: number; pages: number; page: number }>
    abstract retrieve(id: string): Promise<T | null>
    abstract search(query: FilterQuery<T>): Promise<T[]>
    abstract update(id: string, update: UpdateQuery<T>): Promise<T>
    abstract updateByQuery(query: FilterQuery<T>, update: UpdateQuery<T>): Promise<T>
    abstract updateMany(id: string[], update: UpdateQuery<T>): Promise<T[]>
    abstract upsert(query: FilterQuery<T>, update: UpdateQuery<T>): Promise<T>
}
