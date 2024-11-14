import express from 'express';
import { createOrders } from '../controllers/orders.controllers.js';

const router = express.Router();

router.post('/', (req, res, next) => {
    // console.log('Request body:', req.body);
    createOrders(req, res);
});

export default router;