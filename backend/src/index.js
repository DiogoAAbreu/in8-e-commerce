import express from 'express';
import 'dotenv/config';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.listen(5000, () => {
    console.log('Run in http://localhost:5000/')
});