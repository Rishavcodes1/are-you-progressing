import connectToDatabase from "@/lib/connectToDatabase";
import { Weight } from "@/models/weight.model";
import { response } from "@/utils/createApiResponse";
import { HttpStatusCode } from "axios";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET(request: NextRequest) {

    const session = await getServerSession(authOptions)
    if(!session?.user){
        return response(HttpStatusCode.Unauthorized, false, "Unauthorised user")
    }

    const { searchParams } = new URL(request.url)
    const month = searchParams.get("month")
    const year = searchParams.get("year")
    const day = searchParams.get("day")

    let query: any = {userId:session.user.id};

    if (year && month && day) {
        const date = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        query.date = date;
    } else if (year && month) {
        query.date = { $regex: `^${year}-${month.padStart(2, "0")}-` };
    } else if (year) {
        query.date = { $regex: `^${year}-` };
    } else if (month) {
        query.date = { $regex: `-${month.padStart(2, "0")}-` };
    }
    try {
        await connectToDatabase()

        const foundWeightLogs = await Weight.find(query).limit(10)

        if (!foundWeightLogs) {
            return response(HttpStatusCode.NotFound, false, "No data found")
        }

        return response(HttpStatusCode.Found, true, "Data fetched successfully", foundWeightLogs)

    } catch (error) {
        return response(HttpStatusCode.InternalServerError, false, `Something went wrong while fetching the Workout :: error`)
    }
}