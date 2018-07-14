import jwt from 'express-jwt';
import mongoose from 'mongoose';

const order_schema = mongoose.Schema({
    user: { type: String, required: true },
    products: {
        type: [{ id: String, price: Number }],
        required: true
    }
});

const Order = mongoose.model('Order', order_schema);

export default Order;