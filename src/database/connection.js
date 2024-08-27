const mongoose = require('mongoose');
// mongoose.connect("mongodb://127.0.0.1:27017/students-api")
// .then(()=>{
//     console.log("Connected to MongoDB");
// })
// .catch((error)=>{
//     console.log(`Error connecting to Mongo`);
// })
// // we need to export this file.. to app.js

const mongoConnection = async () =>{
    try{
        const con = await mongoose.connect("mongodb://127.0.0.1:27017/students-api")
        console.log("Mongo Db Connectted"); 
    }catch(e){
        console.log(e);
    }
}
mongoConnection();