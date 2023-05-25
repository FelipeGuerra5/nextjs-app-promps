import mongoose from 'mongoose'

let isConnected = false

export const connectToDB = async () => { 
    // If don't we will get warnings on the console
    mongoose.se('strictQuery', true)

    if(isConnected) {
        console.log('MongoDB is already connected')
        return
    } 

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbNmae: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true

        console.log("MongoDB conected")
    } catch (error) {
        console.log(error)
    }
}