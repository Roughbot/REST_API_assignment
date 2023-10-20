import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import Catalog from '../models/Catalog.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import tokenAuthenticate from './tokenAuthentication.js';

router.post('/create-catalog', tokenAuthenticate, async (req, res) => {
    const { products } = req.body; // array of product objects
    const  userId  = req.user.userid;
   
    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: 'Invalid or empty products array.' });
    }

    try {
        // Check if the user already has a catalog
        const existingCatalog = await Catalog.findOne({ seller: userId });

        if (existingCatalog) {
            // If a catalog exists, update the products in the existing catalog
            const productIds = [];

            for (const product of products) {
                const newProduct = new Product({
                    _id: new mongoose.Types.ObjectId(),
                    name: product.name,
                    price: product.price,
                });
                await newProduct.save();
                productIds.push(newProduct._id);
                
            }
            existingCatalog.products = existingCatalog.products.concat(productIds);
            
            // Save the updated catalog
            await existingCatalog.save();

            res.status(200).json({ message: 'Catalog updated successfully', catalog: existingCatalog });
        } else {

            // If no catalog exists, create a new one
            const productIds = [];

            for (const product of products) {
                const newProduct = new Product({
                    _id: new mongoose.Types.ObjectId(),
                    name: product.name,
                    price: product.price,
                });
                await newProduct.save();
                productIds.push(newProduct._id);
            }

            const catalog = new Catalog({
                seller: userId,
                products: productIds,
            });

            await catalog.save();

            res.status(201).json({ message: 'Catalog created successfully', catalog });
        }
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});



router.get('/orders', tokenAuthenticate, async (req,res) => {
    try{
        const userId = req.user.userid;

        const orders = await Order.find({seller: userId});

        const availableOrders = orders.map(order => {
            const buyerId = order.buyer;
            const products = order.products.map(product => product); 
            return {  buyerId, products};
        });

        res.json({availableOrders});

    }catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error"});
    }
});

export default router;

