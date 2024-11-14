import express from 'express';
import {createCustomer} from "../controllers/customer.controllers.js";

const router = express.Router();

router.post('/', createCustomer);

export default router;