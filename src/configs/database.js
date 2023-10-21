import mongoose from "mongoose"

export const connectMongoDb = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_DB_URI)
        console.log(`mongodb connected to ${connection.host}`)
    } catch (error) {
        console.log('shutting down the server due to mongodb connection error ')
        console.log('mongo error', error)
        process.exit(1)
    }
}



