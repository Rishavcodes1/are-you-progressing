import connectToDatabase from "@/lib/connectToDatabase";
import { Weight } from "@/models/weight.model";
import { response } from "@/utils/createApiResponse";
import { HttpStatusCode } from "axios";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
HttpStatusCode

export async function GET(request: NextRequest, { params }: { params: { date: string } }) {

    const { date } = await params
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return response(HttpStatusCode.Unauthorized, false, "Unauthorised user")
    }
    try {
        await connectToDatabase()
        const userId = session.user.id

        const foundWeightLog = await Weight.findOne({
            $and: [{ userId: userId }, { date: new Date(date) }]
        })

        if (!foundWeightLog) {
            return response(HttpStatusCode.NotFound, false, `Weight log not found for the date ${date}`)
        }

        return response(HttpStatusCode.Ok, true, `Weight log for the date ${date} fetched successfully`, foundWeightLog)

    } catch (error) {
        return response(HttpStatusCode.InternalServerError, false, `Something went wrong while fetching the weight of ${date} :: error`)
    }
}