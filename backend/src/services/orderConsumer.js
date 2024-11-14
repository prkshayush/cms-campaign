import amqp from 'amqplib';
import mongoose from 'mongoose';
import Order from '../models/orders.model.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from correct path
dotenv.config({ path: path.join(__dirname, '../../.env') });

// dummy credentials for RabbitMQ URL
const RABBITMQ_URL = process.env.RABBIT_URI;
const QUEUE_NAME = 'orders_queue';

async function startConsumer() {
    try {
        // Connect to MongoDB using env
        const mongoUri = process.env.MONGO_URI;
        const dbName = process.env.DB_NAME;
        if (!mongoUri || !dbName) {
            throw new Error('MONGO_URI and DB_NAME must be defined in environment variables');
        }

        // Connect to MongoDB with database name
        await mongoose.connect(`${mongoUri}/${dbName}`, {
            serverSelectionTimeoutMS: 5000
        });

        console.log(`Connected to MongoDB database: ${dbName}`);

        // Connect to RabbitMQ
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME);
        console.log('Connected to RabbitMQ');

        // orderConsumer.js - update consume section
        channel.consume(QUEUE_NAME, async (data) => {
            try {
                const orders = JSON.parse(data.content);

                // Validate orders array
                if (!Array.isArray(orders)) {
                    throw new Error('Invalid message format: expected array of orders');
                }

                // Process orders
                await Order.insertMany(orders.map(order => ({
                    ...order,
                    amount: Number(order.amount) // Convert amount to number
                })));

                console.log(`Processed ${orders.length} orders`);
                channel.ack(data);
            } catch (error) {
                console.error('Processing error:', error);
                channel.nack(data, false, false);
            }
        });

        // Graceful shutdown
        process.on('SIGINT', async () => {
            await channel?.close();
            await connection?.close();
            await mongoose.connection.close();
            process.exit(0);
        });

    } catch (error) {
        console.error('Startup error:', error);
        process.exit(1);
    }
}

startConsumer();