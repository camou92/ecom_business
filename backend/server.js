import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import productRouter from './router/productRouter.js';
import userRouter from './router/userRouter.js';
import orderRouter from './router/orderRouter.js';
import uploadRouter from './router/uploadRouter.js';;
//require('dotenv').config({path: './config/.env'});
require ('./config/db');
const app = express();
dotenv.config();
// app.get('/api/products/:id', (req, res) => {
//     const product = data.products.find((x) => x._id === req.params.id);
//     if(product){
//         res.send(product);
//     } else {
//         res.status(404).send({message: 'Product not Found'});
//     }
// });
// app.get('/api/products', (req, res) => {
//     res.send(data.products);
// });

// app.use((err, req, res, next) =>{
//     res.status(500).send({ message: err.message });
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
  });
  const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.get('/', (req, res) =>{
    res.send('Server is ready');
});

app.use((err, req, res, next) =>{
    res.status(500).send({ message: err.message});
});
app.listen(5000, () => { console.log("Server started at http://localhost:5000")});