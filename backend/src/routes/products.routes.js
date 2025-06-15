import express from 'express';
import { getAllProducts, getProductById } from '../controllers/products.controller.js';

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);

export default router;