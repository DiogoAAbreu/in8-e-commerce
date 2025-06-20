import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import productsRouters from './routes/products.routes.js'
import ordersRouters from './routes/orders.routes.js'

const app = express();

app.use(cors());

app.use(express.json());

app.use(productsRouters);
app.use(ordersRouters);

app.listen(5000, () => {
    console.log('Run in http://localhost:5000/')
});