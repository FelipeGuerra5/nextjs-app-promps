import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '@utils/databse'
import User from '@models/user'



const handler = NextAuth({
    provider: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],

    async session ({ session }) {

    },

    async signIn ({ profile }) {
        try {
            await connectToDB()            

            // Check if user existis

            // IF not create and add to DB

            return true

        } catch (error) {
            console.log(error)
        }
    }
})

export {handler as GET, handler as POST}