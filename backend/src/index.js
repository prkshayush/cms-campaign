import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";


dotenv.config({
    path: './.env'}
);

// connection to db and catching errors
connectDB()
.then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`server is running on port ${process.env.PORT}`);
        });
    }
)
.catch((error) => {
    console.log("connection error", error);
});

