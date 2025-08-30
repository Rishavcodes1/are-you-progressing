import connectToDatabase from "@/lib/connectToDatabase";
import { User } from "@/models/user.model";
import { Workout } from "@/models/workout.model";
import { response } from "@/utils/createApiResponse";
import { HttpStatusCode } from "axios";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

export async function POST(request: NextRequest) {

    const session = await getServerSession(authOptions)

    if (!session?.user) {
        return response(HttpStatusCode.Unauthorized, false, "Unauthorised user")
    }

    const { exercise } = await request.json()
    if (!exercise.length) {
        return response(HttpStatusCode.LengthRequired, false, "Exercises are required")
    }
    try {
        await connectToDatabase()
        const userId = session.user.id
        const loggedWorkout = await Workout.create({
            userId,
            date: new Date().toISOString().split("T")[0],
            exercise
        })

        if (!loggedWorkout) {
            return response(HttpStatusCode.InternalServerError, false, "Something went wrong while logging workout")
        }

        await User.findByIdAndUpdate(userId, {
            $set: {
                lastWorkoutLog: loggedWorkout.createdAt
            }
        })

    } catch (error) {
        return response(HttpStatusCode.InternalServerError, false, "Something went wrong while logging the workout :: error")
    }
}

