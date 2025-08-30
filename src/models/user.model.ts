import bcrypt from "bcryptjs";
import mongoose, { model, models, Schema } from "mongoose";

export interface Iuser {
    _id?: mongoose.Types.ObjectId;
    username: string;
    name: string;
    email: string;
    password: string;
    birthDate: Date;
    height: number;
    profilePhoto?: string;
    initialWeight: number;
    currentWeight?: number;
    targetWeight: number;
    lastWeightLog?: Date;
    lastWorkoutLog?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<Iuser>({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePhoto: String,
    birthDate: {
        type: Date,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    initialWeight: {
        type: Number,
        required: true
    },
    currentWeight: {
        type: Number,
        required: true
    },
    targetWeight: {
        type: Number,
        required: true
    },
    lastWeightLog: Date,
    lastWorkoutLog: Date,

}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

export const User = models?.User || model<Iuser>("User", userSchema)