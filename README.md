# Realm - CRM & Campaign managment app

## Architecture - Backend

### Core Components

- **Express.js Server**: RESTful API endpoints
- **MongoDB**: Data persistence
- **RabbitMQ**: Message queue for handling bulk orders

### Pub/Sub Implementation

The application uses a publisher-subscriber pattern for processing bulk orders:

1. Publisher (`orders.controller.js`): Publishes orders to RabbitMQ queue
2. Consumer (`orderConsumer.js`): Processes orders from queue and saves to MongoDB

## Backend setup

### Prerequisites

- Node.js
- MongoDB
- RabbitMQ
- Docker and Docker Compose

### Bulk Order Processing

- The system implements a pub/sub architecture for processing bulk orders:

### Publishing Orders

- Orders are sent to /api/orders
- The controller publishes to RabbitMQ queue 'orders_queue'
- Returns 202 Accepted response

#### Processing Orders

- orderConsumer.js listens to 'orders_queue'
- Validates and processes orders in batches
- Saves orders to MongoDB
- Acknowledges successful processing

## Architecture - Frontend

### Core Technologies

- Next.js 15
- Tailwind CSS
- React Query
- Axios

### Key Features

#### Dashboard

- Campaign analytics and metrics visualization
- Real-time campaign performance tracking
- Quick access to recent campaigns and segments

#### Campaign Management

- Create/Edit campaign workflows
- Campaign scheduling and timing controls
- Target audience selection through segments
- Campaign performance statistics

#### Customer Segmentation

- Create dynamic customer segments
- Rule-based segmentation builder
- Segment analytics and insights
- Real-time segment size estimation

#### Order Management

- Bulk order submission interface
- Order status tracking
- Real-time processing feedback
- Order history and analytics

### Integration Points

- Connects with backend REST APIs
- Real-time updates using polling
- File upload handling for bulk operations
- Error handling and retry mechanisms

### State Management

- React Query for server state
- Context API for global UI state
