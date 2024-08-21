import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import pkg  from 'body-parser';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();
const { json }=pkg;
mongoose.connect("mongodb+srv://samyak07:Indianarmy07@vividindia.h3eft.mongodb.net/?retryWrites=true&w=majority&appName=vividIndia")
.then(() => {
    console.log('MongoDB is connected');

})
.catch((err)=>{
    console.log(err);
})
const app=express();


app.use(express.json());
app.listen(3000,()=>{
    console.log('Server is running on port 3000!!');
});

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||'Internal Server';
    res.status(statusCode).json(
        {
            success:false,
            statusCode,
            message
        }
    )
});
app.use('/api/user', userRoutes);
app.use('/api/auth',authRoutes);