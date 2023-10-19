import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const PORT = 4444;
app.use(bodyParser.json());


const authRoutes = require('./routes/authUser');
const buyerRoutes = require('./routes/buyers');
const sellerRoutes = require('./routes/sellers');

app.get('/', (req, res) => {
    res.send('Hi there');
});

app.use('/api/auth', authRoutes);
app.use('/api/buyer', buyerRoutes);
app.use('/api/seller', sellerRoutes);

mongoose.
    connect('mongodb+srv://Admin:adminAdmin@ecommerceapi.9i2uer5.mongodb.net/ecommerceAPI?retryWrites=true&w=majority')
    .then(() => {
        console.log('DataBase connected')
        app.listen(PORT, () =>
            console.log(`Server running on port: http://localhost:${PORT}`)
        );
    }).catch((error) => {
        console.log(error)
    });