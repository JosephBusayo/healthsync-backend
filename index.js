import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000


//Routes
import authRoute from './routes/auth.js'

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true })) //for accepting form data
app.use(cookieParser())
app.use(
    session({
        secret: "ADDFERMTYY2",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI
        })
    })
)
app.use(passport.initialize())
app.use(passport.session())


app.use('/auth', authRoute)

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected`);
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    } catch (err) {
        console.error(err);
    }
};
connectDB()