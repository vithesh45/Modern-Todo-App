import express from 'express';
import dotenv from 'dotenv'
import { connectDb } from './config/db.js';
import todoRoutes from "./Routes/todo.routes.js";
dotenv.config()
const app = express();
app.use(express.json())
app.use('/api/todos', todoRoutes)
   connectDb();
app.listen(5000,() =>{
    console.log('🌐 MONGO_URI =', process.env.MONGO_URI);
    console.log('server started at http://localhost:5000')
})