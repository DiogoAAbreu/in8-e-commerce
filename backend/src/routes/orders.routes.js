import express from 'express';
import { validateOrderRequest } from '../middlewares/validation.middleware.js';
import { createOrder, getOrderById } from '../controllers/orders.controller.js';

const router = express.Router();

router.post('/orders', validateOrderRequest, createOrder);
router.get('/orders/:orderId', getOrderById);

export default router;