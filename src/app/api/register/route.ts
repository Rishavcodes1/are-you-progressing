import connectToDatabase from "@/lib/connectToDatabase";
import { User } from "@/models/user.model";
import { response } from "@/utils/createApiResponse";
import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest) {
    const { username, name, email, password, birthDate, height, initialWeight, targetWeight } = await request.json()


    if ([username, name, email, password, birthDate, height, initialWeight, targetWeight].some((field) => field.trim() === "")) {
        return response(HttpStatusCode.LengthRequired, false, "All fields are required")
    }

    try {
        await connectToDatabase()

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return response(HttpStatusCode.Conflict, false, "User with the same email already exists")
        }

        const createdUser = await User.create({
            username,
            name,
            email,
            password,
            birthDate,
            height,
            initialWeight,
            currentWeight: initialWeight,
            targetWeight
        })

        if (!createdUser) {
            return response(HttpStatusCode.InternalServerError, false, "Something went wrong while registering the user")
        }

        return response(HttpStatusCode.Ok, true, "User registered successfully")
    } catch (error) {
        return response(HttpStatusCode.InternalServerError, false, `Something went wrong :: error ${error}`)
    }
}