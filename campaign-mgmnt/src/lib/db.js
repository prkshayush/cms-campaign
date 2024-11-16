import mongoose from "mongoose";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '../../.env');

// issues with .env
// logging to check if the .env file is loaded
if (!dotenv.config({ path: envPath }).error) {
    console.log('Environment loaded, DB_NAME:', process.env.DB_NAME);
} else {
    console.error('Failed to load .env from:', envPath);
    process.exit(1);
}
const db_name = process.env.DB_NAME
const mongo_uri = process.env.MONGO_URI

const connectDB = async () => {
    try {
        // mongoose returns a promise, so we can use await
        const connectionInstance = await mongoose.connect(`${mongo_uri}/${db_name}`);
        console.log(process.env.DB_NAME)
        // logging to see if connected to the database and which host are connected to
        console.log(`Connected to MongoDB: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
        // using process.exit(1) to exit the Node.js process with a failure code
        process.exit(1);
    }
}

export default connectDB;