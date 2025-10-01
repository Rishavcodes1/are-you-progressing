import connectToDatabase from "@/lib/connectToDatabase";
import { User } from "@/models/user.model";
import { usernameValidation } from "@/schemas/register.schema";
import { response } from "@/utils/createApiResponse";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";
import * as zod from "zod"

export async function POST(request: NextRequest) {
    const { username } = await request.json()
    try {
        await connectToDatabase()


        const isUsernameValid = zod.object({ username: usernameValidation }).safeParse({ username })

        console.log(isUsernameValid)

        if (!isUsernameValid.success) {
            return response(HttpStatusCode.NotAcceptable, false, `${isUsernameValid.error}`)
        }

        const existingUsername = await User.findOne({ username })

        if (existingUsername) {
            return response(HttpStatusCode.Conflict, false, "Usename not available")
        }

        return response(HttpStatusCode.Ok, true, "Usename is available")


    } catch (error) {
        return response(HttpStatusCode.InternalServerError, false, "Internal server error")
    }
}