import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

const connectDB = mongoose.connect(process.env.MONGODB_URL)

const db = mongoose.connection

db.on('connected', () => {
    console.log('MongoDb Connected');
})

db.on('disconnected', () => {
    console.log('MongoDB Disconnected');
})

db.on('error', () => {
    console.log('MongoDB Error');
})

export default db