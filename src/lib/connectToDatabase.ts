import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in the .env file")
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { connection: null, promise: null }
}

const connectToDatabase = async () => {
    if (cached.connection) return cached.connection

    if (!cached.promise) {
        const options = {
            bufferCommands: true,
            maxPoolSize: 10
        }
        cached.promise = mongoose
            .connect(MONGODB_URI, options)
            .then(() => mongoose.connection)
    }

    try {
        cached.connection = await cached.promise
    }
    catch (error) {
        console.error('Something went wrong while connecting to databse :: ', error);
        process.exit(1)
    }

    console.log(cached.connection.name)
    return cached.connection
}

export default connectToDatabase