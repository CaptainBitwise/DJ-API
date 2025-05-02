import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDb = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in .env");
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Mongodb connected');
    } catch (err) {
        console.error('MongoDb connection error: ', err.message);
        process.exit(1);
    }
}

export default connectDb;