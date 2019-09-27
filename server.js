const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()
//Import routes
const authRoute = require('./routes/auth')


dotenv.config()

//connect to databe
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true },(err)=>{
    if(!err){
        console.log('MongoDB connection successful')
    }else{
        console.log('Connection failed.')
    }
})


//middleware
app.use(express.json())

//Routes middleware
app.use('/api/teacher',authRoute)




app.listen(3000, ()=> {
    console.log('Server at 3000');
})