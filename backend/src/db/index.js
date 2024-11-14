import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        // mongoose returns a promise, so we can use await
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        // logging to see if connected to the database and which host are connected to
        console.log(`Connected to MongoDB: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
        // using process.exit(1) to exit the Node.js process with a failure code
        process.exit(1);
    }
}

export default connectDB;