import mongoose, { model, models, Schema } from "mongoose";

interface ISet {
    weight: number;
    reps: number;
    alone: number;
    assisted: number;
}

interface IExercise {
    name: string;
    sets: ISet[]
}

interface IWorkout {
    _id?: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    exercise: IExercise[],
    createdAt: Date;
    updatedAt: Date;

}

const setSchema = new Schema<ISet>({
    weight: { type: Number, required: true },
    reps: { type: Number, required: true },
    alone: { type: Number, required: true },
    assisted: { type: Number, required: true },
})

const exerciseSchema = new Schema<IExercise>({
    name: { type: String, required: true },
    sets: { type: [setSchema], required: true }
})

const workoutSchema = new Schema<IWorkout>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    exercise: {
        type: [exerciseSchema],
        required: true
    }
}, { timestamps: true })

export const Workout = models?.Workout || model<IWorkout>("Workout", workoutSchema)