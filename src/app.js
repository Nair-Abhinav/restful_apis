const express = require("express")
const app = express();
app.use(express.json()) // to pass and recieve data in the fporm of json
require('./database/connection');
const Student = require('./models/students')
const port = process.env.PORT || 3000


// to create connection on server...

// get request..

app.get("/students", async (req,res)=>{
    try{
        const result = await Student.find();
        res.send(result);
        res.status(200);
    }catch(e){
        res.status(404).send(e); // to return error message if there is any error occured while fetching data from database
    }
})

// to get individual data from db using id..
app.get("/students/:id",async (req ,res) => {
    try{
        const _id = req.params.id;
        console.log(_id);
        const studentData = await Student.findById(_id);
        console.log(studentData);
        if(!studentData) {
            return res.status(404).send("No Data found");
        }
        else{
            res.send(studentData);
        }
    }catch(e){
        res.status(500).send(e);
    }
})



// to handle post request ie to send data.. create operation
app.post("/students", async (req,res) => {
    
    try{
        console.log(req.body);
        const user = new Student({
            name: req.body.name,
            email: req.body.email,
            phone: parseInt(req.body.phone), // Parse phone number as a number
            address: req.body.address
        });
        // to save the documents in the database..
        const result = await user.save();
        res.status(201)
        res.send(user) // success
    }catch(e){
        console.log(e);
        res.status(400)
        res.send(e)   // bad request
    }
})


// for delete operations..
// deleting a document by id..
app.delete("/students/:id",async (req,res) => {
    try{
        const _id = req.params.id;
        const data = await Student.findByIdAndDelete(_id);
        if(!req.params.id){
            res.status(404).send();
        }
        else{
            res.send(data);
        }
    }catch(e){
        res.status(500).send(e);
    }
})




app.listen(port,() => {
    console.log(`Connection established at ${port}`)
})
