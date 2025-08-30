import connectToDatabase from "@/lib/connectToDatabase";
import { Workout } from "@/models/workout.model";
import { response } from "@/utils/createApiResponse";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";
import mongoose, { mongo } from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { Weight } from "@/models/weight.model";

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        return response(HttpStatusCode.Unauthorized, false, "Unauthorised user")
    }
    const userId = session.user.id


    const { searchParams } = new URL(request.url)
    const month = searchParams.get("month")
    const year = searchParams.get("year")
    const day = searchParams.get("day")
    const exercise = searchParams.get("exercise")



    const { ObjectId } = mongoose.Types

    let query: any = {}

    if (year && month && day) {
        query.date = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

    } else if (year && month) {
        query.date = { $regex: `^${year}-${month.padStart(2, "0")}-` }
    } else if (year) {
        query.date = { $regex: `^${year}-` }
    } else if (month) {
        query.date = { $regex: `-${month.padStart(2, "0")}-` }
    }

    let pipeline: any = [
        { $match: { userId: new ObjectId(userId) } },
        ...(Object.keys(query).length ? [{ $match: query }] : [])
    ]

    if (exercise) {
        pipeline.push({

            $project: {
                exercises: {
                    $filter: {
                        input: "$exercise",
                        as: "exercise",
                        cond: { $eq: ["$$exercise.name", exercise] }
                    }
                }
            }
        })

    }
    try {
        await connectToDatabase()

        const foundWorkoutLogs = await Workout.aggregate(pipeline)


        if (!foundWorkoutLogs.length) {
            return response(HttpStatusCode.NotFound, false, "No data found")
        }

        return response(HttpStatusCode.Found, true, "Data fetched successfully", foundWorkoutLogs)

    } catch (error) {
        return response(HttpStatusCode.InternalServerError, false, `Something went wrong while fetching the Workout :: error`)
    }
}