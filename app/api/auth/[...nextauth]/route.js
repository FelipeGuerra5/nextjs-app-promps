import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '@utils/database'
import User from '@models/user'



const handler = NextAuth({
    provider: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],

    async session ({ session }) {
        const sessionUser = User.findOne({
            email: session.user.email
        })

        session.user.id = sessionUser._id.toString()

        return session
    },

    async signIn ({ profile }) {
        try {
            await connectToDB()            

            // Check if user existis
            const userExists = await User.findOne({
                email: profile.email
            })

            // If not create and add to DB
            if(!userExists) {
                await User.create({
                    emai: profile.email,
                    username: profile.name.replace(" ", "").toLowerCase(),
                    image: profile.picture
                })
            }

            return true

        } catch (error) {
            console.log(error)
        }
    }
})

export {handler as GET, handler as POST}