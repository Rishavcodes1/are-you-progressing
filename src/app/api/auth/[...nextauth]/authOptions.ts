import connectToDatabase from "@/lib/connectToDatabase"
import { User } from "@/models/user.model"
import bcrypt from "bcryptjs"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {


    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                identifier: { label: "Email or Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {


                if (!credentials?.identifier || !credentials?.password) {
                    throw new Error("Both fields are required")
                }
                try {
                    await connectToDatabase()
                    const foundUser = await User.findOne({
                        $or: [{ email: credentials.identifier }, { username: credentials.identifier }]
                    })

                    if (!foundUser) {
                        throw new Error("No user found")
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, foundUser.password)
                    if (!isPasswordCorrect) {
                        throw new Error("Invalid password")
                    }


                    return foundUser

                } catch (error) {
                    throw error
                }
            }

        })
    ],
    callbacks: {
        async jwt({ token, user }) {

            if (user) {

                token._id = user.id;
                token.email = user.email;
            }

            return token
        },
        async session({ session, token }) {
            if (token) {

                session.user.email = token.email;
                session.user.name = token.name;
                session.user.id = token._id as string;
                session.user.username = token.username
            }
            return session
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 3600
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET!
}