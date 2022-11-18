import mongoose from 'mongoose'

// connect to mongoDB Atlas
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Atlas already connected: ${conn.connection.host}`.green.underline)
    } catch (err) {
        console.log(`${err.message}`.red.bold)
        process.exit(1)
    }
}

export default connectDB