import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import Catalog from '../models/Catalog.js';
import Product from '../models/Product.js';
import Oeder from '../models/Order.js';
import User from '../models/User.js';

function tokenAuthenticate(req, res, next){
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({error:'Access Denied'});
    }

    jwt.verify(token, 'secret', (err, user) => {
        if (err) {
            return res.status(403).json({error:'Invalid Token'});
        }else{
            req.user = user;
            next();
        }
    });
}

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
        const {seller_id } = req.params;
        const catalog = await Catalog.findOne({seller: seller_id}).populate('products', 'name price');
        if(!catalog){
            return res.status(404).json({error:'Seller Catalog not found'});
        }
        res.json(catalog.products);
    }catch(error){
        console.error(error);
        res.status(500).json({error:'Internal Server Error'});
    }
});


router.post('/create-order/:seller_id',);

export default router;
