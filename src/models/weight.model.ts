import mongoose, { model, models, Schema } from "mongoose";

interface IWeight {
    _id?: mongoose.Types.ObjectId
    userId: mongoose.Types.ObjectId;
    weight: number;
    createdAt: Date;
    updatedAt: Date;
}

const weightSchema = new Schema<IWeight>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    weight: {
        type: Number,
        required: true
    }

}, { timestamps: true })

export const Weight = models?.Weight || model<IWeight>("Weight", weightSchema)