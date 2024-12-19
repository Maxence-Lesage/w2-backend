import express from 'express'
import "dotenv/config"
import mongoose from 'mongoose'
import userRouter from './routes/userRouter.js'
import playlistRouter from './routes/playlistRouter.js'
import cors from 'cors'

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(userRouter, playlistRouter);

const mongo_uri = process.env.MONGO_URI;
const middleware = (req, res) => {
    console.log('My Middleware')
    next()
}

app.get('', middleware, (request, response) => {
    response.send("Hello World")
})

mongoose.connect(mongo_uri);
const db = mongoose .connection ;
db.on("connected", () => console.log("MongoDB connection fine"));
db.on("error", console.error.bind(console, "MongoDB connection error:" ));


app.listen(port, () => console.log('Server is running on port ' + port))