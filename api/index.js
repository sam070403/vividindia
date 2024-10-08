import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import pkg  from 'body-parser';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
dotenv.config();
const { json }=pkg;
mongoose.connect("mongodb+srv://samyak07:Indianarmy07@vividindia.h3eft.mongodb.net/?retryWrites=true&w=majority&appName=vividIndia")
.then(() => {
    console.log('MongoDB is connected');

})
.catch((err)=>{
    console.log(err);
})

const __dirname = path.resolve();
const app=express();
app.use(cookieParser());

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true // Allow credentials (cookies)
  }));
app.listen(3000,()=>{
    console.log('Server is running on port 3000!!');
});


app.use('/api/user', userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);
app.use('/api/comment',commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
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