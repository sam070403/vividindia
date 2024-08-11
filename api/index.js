import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import pkg  from 'body-parser';
import userRoutes from './routes/user.route.js';

dotenv.config();
const { json }=pkg;
mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('MongoDB is connected');

})
.catch((err)=>{
    console.log(err);
})
const app=express();


app.use(json());
app.listen(3000,()=>{
    console.log('Server is running on port 3000!!');
});


app.use('/api/user', userRoutes);