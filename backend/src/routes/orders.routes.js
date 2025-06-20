import express from 'express';
import { validateOrderRequest } from '../middlewares/validation.middleware.js';
import { createOrder } from '../controllers/orders.controller.js';

const router = express.Router();

router.post('/orders', validateOrderRequest, createOrder);

export default router;