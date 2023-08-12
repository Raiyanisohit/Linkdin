import express from 'express';
import mongoose from 'mongoose';
import route from './Routes/Route.js';
import cors from 'cors'
import coocki from 'cookie-parser'
import fileupload from 'express-fileupload'
import dotenv from 'dotenv'
dotenv.config();
const app = express();
app.use(fileupload())
app.use(coocki());
app.use(cors("*"));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/LinkedIn').then(() => console.log("Database Connected...")).catch((err) => console.log(err));

app.use('/', route);

app.listen(3010, () => console.log("Server is running...."));
