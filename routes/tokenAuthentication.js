import jwt from 'jsonwebtoken';

const tokenAuthenticate = (req, res, next) => {

    const token = req.header('Authorization');

    const secretKey = process.env.JWT_SECRET; 
    
    if (!token) {
        return res.status(401).json({ error: 'Access Denied' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid Token' });
        } else {
            req.user = user;
            next();
        }
    });
};

export default tokenAuthenticate;
