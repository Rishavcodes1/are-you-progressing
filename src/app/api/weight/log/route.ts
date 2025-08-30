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

    const { weight, photoUrl } = await request.json()
    if (weight.trim() === "" || photoUrl.trim() === "") {
        return response(HttpStatusCode.LengthRequired, false, "weight and photo both are required")
    }

    try {
        await connectToDatabase()
        const userId = session.user.id
        
        const loggedWeight = await Weight.create({
            userId,
            weight,
            date: new Date().toISOString().split("T")[0],
            photo: photoUrl,
            time: new Date().toLocaleTimeString()
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
        return response(HttpStatusCode.InternalServerError, false, "Something went wrong while logging the weight :: error")
    }
}