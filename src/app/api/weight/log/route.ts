import connectToDatabase from "@/lib/connectToDatabase";
import { Weight } from "@/models/weight.model";
import { response } from "@/utils/createApiResponse";
import { HttpStatusCode } from "axios";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { User } from "@/models/user.model";


export async function POST(request: NextRequest) {

    const session = await getServerSession(authOptions)


    if (!session?.user) {
        return response(HttpStatusCode.Unauthorized, false, "Unauthorised user")
    }

    const { weight } = await request.json()
    if (!weight) {
        return response(HttpStatusCode.LengthRequired, false, "weight and photo both are required")
    }

    try {
        await connectToDatabase()
        const userId = session.user.id

        const existingWeight = await Weight.findOne({
            $and: [{ userId }, { date: new Date().toISOString().split("T")[0] }]
        })

        if (existingWeight) {
            return response(HttpStatusCode.Conflict, false, "Log for the given date already exist")
        }

        const loggedWeight = await Weight.create({
            userId,
            weight,
        })

        if (!loggedWeight) {
            return response(HttpStatusCode.InternalServerError, false, "Something went wrong while logging the weight")
        }

        await User.findByIdAndUpdate(userId, {
            $set: {
                lastWeightLog: loggedWeight.createdAt
            }
        })

        return response(HttpStatusCode.Ok, true, "weight logged successfully")


    } catch (error) {
        console.log(error)
        return response(HttpStatusCode.InternalServerError, false, "Something went wrong while logging the weight :: error")
    }
}