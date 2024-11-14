import Order from '../models/orders.model.js';
import amqp from 'amqplib';

const QUEUE_NAME = 'orders_queue';
// dummy credentials for RabbitMQ URL
const RABBITMQ_URL = process.env.RABBIT_URI;
let channel, connection;

// Connect to RabbitMQ
const connectQueue = async () => {
    try {
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME);
        console.log('Connected to RabbitMQ');
    } catch (error) {
        console.error('RabbitMQ Connection Error:', error);
        throw error;
    }
};

// Initialize connection
connectQueue();

// orders.controller.js
export const createOrders = async (req, res) => {
    try {
        const { orders } = req.body; // Extract orders array from body
        
        if (!orders || !Array.isArray(orders)) {
            return res.status(400).json({
                success: false,
                message: 'Request must contain an orders array'
            });
        }

        if (orders.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Orders array cannot be empty'
            });
        }

        // Publish orders to queue
        channel.sendToQueue(
            QUEUE_NAME,
            Buffer.from(JSON.stringify(orders)) // Send just the orders array
        );

        res.status(202).json({
            success: true,
            message: `${orders.length} orders queued for processing`
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};