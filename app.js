const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
require('dotenv').config()

const userRouter = require('./routes/user-routes')

const app = express();
app.use(express.json())
app.use(morgan("tiny"))
app.use('/', userRouter)


const database = process.env.database
const port = 3000 || process.env.port

mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
                .then(()=> console.log("connected to database"))
                .catch((err)=> console.log(err))

app.listen(port , () =>{
    console.log(`server is listening on port ${port}`)
})                