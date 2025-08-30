import connectToDatabase from "@/lib/connectToDatabase";
import { response } from "@/utils/createApiResponse";
import { HttpStatusCode } from "axios";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { Workout } from "@/models/workout.model";
HttpStatusCode

export async function GET(request: NextRequest, { params }: { params: { date: Date } }) {

    const { date } = params
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return response(HttpStatusCode.Unauthorized, false, "Unauthorised user")
    }
    try {
        await connectToDatabase()
        const userId = session.user.id

        const foundWorkoutLog = await Workout.findOne({
            $and: [{ userId: userId }, { date: date }]
        })

        if (!foundWorkoutLog) {
            return response(HttpStatusCode.NotFound, false, `Workout log not found for the date ${date}`)
        }

        return response(HttpStatusCode.Found, true, `Workout log for the date ${date} fetched successfully`)

    } catch (error) {
        return response(HttpStatusCode.InternalServerError, false, `Something went wrong while fetching the Workout of ${date} :: error`)
    }
}