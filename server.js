const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db');
const app = express();

dotenv.config({path:'./config/config.env'});



dotenv.config({
    path:'./config/config.env'
});

app.use(express.json({}))
app.use(express.json({
    extended:true
}))
connectDB();



const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(`Server Running on ${PORT}` ));

app.use('/api/laidlocus/auth',require('./routes/user'));
app.use('/api/taskCreate',require('./routes/taskcreate'));