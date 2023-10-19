import express from 'express';

const router = express.Router();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/User.js';

router.post('/register', async (req,res) => {
    try {
        const {username, password, type} = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({error:'Username already exist'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({username, password: hashedPassword, type});
        await newUser.save();

        const token = jwt.sign({userId: newUser._id, userType: newUser.type}, 'Auth_Token');
        res.json({token});

    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


router.post('/login', async (res, req) => {
    try{
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if(!user){
            return res.status(401).json({errer: 'Invalid Username or Password.'});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(401).json({error: 'Invalid Username of Password'});
        }

        const token = jwt.sign({userid: user._id, userType: user.type},'Auth_token');

    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export default router;
