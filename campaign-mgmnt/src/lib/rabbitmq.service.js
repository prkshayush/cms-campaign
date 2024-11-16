import amqplib from 'amqplib';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from correct path
dotenv.config({ path: path.join(__dirname, '../../.env') });

const RABBIT_URI = process.env.RABBIT_URI;
console.log('RABBIT_URI:', RABBIT_URI);

if (!RABBIT_URI) {
  throw new Error("Please define the RABBIT_URI environment variable");
}

let connection = null;
let channel = null;

async function connectToRabbitMQ() {
  if (connection && channel) {
    return { connection, channel };
  }

  connection = await amqplib.connect(RABBIT_URI);
  channel = await connection.createChannel();
  return { connection, channel };
}

async function publishToQueue(queueName, message) {
  const { channel } = await connectToRabbitMQ();
  await channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
}

async function consumeFromQueue(queueName, callback) {
  const { channel } = await connectToRabbitMQ();
  await channel.assertQueue(queueName, { durable: true });
  channel.consume(queueName, (msg) => {
    if (msg !== null) {
      const content = JSON.parse(msg.content.toString());
      callback(content);
      channel.ack(msg);
    }
  });
}

export { connectToRabbitMQ, publishToQueue, consumeFromQueue };
