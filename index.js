import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import authRoutes from './routes/authUser.js';
import buyerRoutes from './routes/buyers.js';
import sellerRoutes from './routes/sellers.js'; 

const app = express();
const PORT = 4444;
app.use(bodyParser.json());
app.use(morgan('dev'));

mongoose.
    connect('mongodb+srv://Admin:' + process.env.MONGO_PASSWORD + '@ecommerceapi.9i2uer5.mongodb.net/ecommerceAPI?retryWrites=true&w=majority',{})
    .then(() => {
        console.log('DataBase connected')
        app.listen(PORT, () =>
            console.log(`Server running on port: http://localhost:${PORT}`)
        );
    }).catch((error) => {
        console.log(error)
    }); 

app.use((req,res,next) =>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers, Origin, X-Requested-With, Accept, Authorization" );
    if (req.method == 'OPTION'){
        res.header('Access-Coltrol-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
    }
    next();
});

app.get('/', (req, res) => {
    res.send('Hi there');
});



app.use('/api/auth', authRoutes);
app.use('/api/buyer', buyerRoutes);
app.use('/api/seller', sellerRoutes);


app.use((req,res,next)=> {
    const error = new error('Not Found');
    error.status = 404;
    next(error);
});

app.use((req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

