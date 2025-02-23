import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type UserDocument = User & Document

@Schema({
    _id: true,
    timestamps: true,
    versionKey: false,
})
export class User {
    _id: string

    @Prop({ isRequired: true, unique: true, trim: true, lowercase: true, type: String })
    email: string

    @Prop({ isRequired: true, type: String })
    password: string

    @Prop()
    refresh: string
}

const UserSchema = SchemaFactory.createForClass(User)

UserSchema.set('toJSON', {
    transform: function (_, doc) {
        delete doc.createdAt
        delete doc.updatedAt
        delete doc.__v

        return doc
    },
})

export { UserSchema }
