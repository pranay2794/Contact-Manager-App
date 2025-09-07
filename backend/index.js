const express=require('express');
const cors=require('cors');
const app=express();
require('dotenv').config();
dbconnect=require('./config/dbConnection');
dbconnect();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({extended:true}));

const {errorHandler}=require('./middlerware/errorHandler');
const userRoutes=require('./routes/userRoutes');
const contactRoutes=require('./routes/contactRoutes');

app.use('/api/users',userRoutes);
app.use('/api/contacts',contactRoutes)
app.use(errorHandler)

const PORT= 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

