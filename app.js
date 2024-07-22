const express =require('express');
const app=express();
const dbConnect =require('./server/models/dbConnect')
const port = 8000
const bodyparser=require('body-parser')
const dotenv=require('dotenv');
dotenv.config();
// Middleware
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
const routes=require('./server/adminRoutes/adminRoutes');
// Routes
app.use("/api/admin", routes);

// Database connection
dbConnect();
app.listen(port,(req,res)=>{
    console.log(`Server is running at ${port}`)
})