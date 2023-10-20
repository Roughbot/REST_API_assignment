import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import Catlalog from '../models/Catalog.js';
import Product from '../models/Product.js';
import Oeder from '../models/Order.js';
import User from '../models/User.js';
import Catalog from '../models/Catalog.js';

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

router.post('/create-catalog', tokenAuthenticate, async (req, res) => {
    try {
            const { items } = req.body;
            const { userId } = req.body;
            const catalog = new Catalog({
                seller: userId,
                products: items, //array of product object
            });
            await catalog.save();
            res.json(catalog);

    }catch(error){
        console.error(error);
        res.status(500).json({error:"Internal Server Error"});
    }
});




router.get('/orders',);

export default router;

