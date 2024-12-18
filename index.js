import express from 'express'
import "dotenv/config"
import movieRouter from './routes/movieRouter.js'
import mongoose from 'mongoose'
import userRouter from './routes/userRouter.js'

const app = express()
const port = process.env.PORT

app.use(movieRouter, userRouter);

const mongo_uri = process.env.MONGO_URI;
mongoose .connect(mongo_uri);
const db = mongoose .connection ;
//Bind connection to error event (to get notification of connection errors)
db.on("connected", () => console.log("MongoDB connection fine"));
db.on("error", console.error.bind(console, "MongoDB connection error:" ));


app.listen(port, () => console.log('Server is running on port ' + port))