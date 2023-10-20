import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import Catalog from '../models/Catalog.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import tokenAuthenticate from './tokenAuthentication.js';

router.get('/list-of-sellers', tokenAuthenticate, async (req, res) => {
    try {
        const seller = await User.find({type:'seller'},'username');
        res.json(seller);

    }catch(error){
        console.error(error);
        res.status(500).json({error:'Internal Server Error'});
    }
} );

router.get('/seller-catalog/:seller_id', tokenAuthenticate, async (req, res) => {
    try {
        const { seller_id } = req.params;
        const catalog = await Catalog.findOne({ seller: seller_id }).populate('products', 'name price');

        if (!catalog) {
            return res.status(404).json({ error: 'Seller Catalog not found' });
        }

        res.json(catalog.products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/create-order/:seller_id', tokenAuthenticate, async (req, res) => {
    try {
        const { seller_id } = req.params;
        const { items } = req.body;
        const userId  = req.user.userid;
        // validating the seller id
        const isValidSeller = await User.exists({ _id: seller_id, type: 'seller' });

        if (!isValidSeller) {
            return res.status(400).json({ error: 'Invalid seller check again' });
        }
        //creating order
        const products = [];
        for (const item of items) {
            products.push(item.name);
        }
        //saving the order in the database
        const order = new Order({
            seller: seller_id,
            buyer: userId,
            products: products,
        });
        await order.save();
        res.status(201).json({ message: 'Order created successfully', order });
    }catch(error){
        console.error(error);
        res.status(500).json({error:"Internal Server Error"});
    }
});

export default router;
