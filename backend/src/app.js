import express from "express";
import cors from "cors";

// Create an express app

const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,

    }
));

// limiting the json size to 100kb
app.use(express.json(
    {
        limit: "1000kb",
        extended: true,
    }
));
// url encoder for accepting data from url
app.use(express.urlencoded({
    extended: true,
    limit: "1000kb",
}))

// routes
import customerRoutes from "./routes/customer.routes.js";
import orderRoutes from "./routes/orders.routes.js";
import segmentRoutes from "./routes/segment.routes.js";
import campaignRoutes from "./routes/campaign.routes.js";

app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/segments', segmentRoutes);
app.use("/api/campaigns", campaignRoutes);


export default app; 