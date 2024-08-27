const mongoose = require('mongoose');
const validator = require('validator');

const student_schema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
        minlength: 3,
    },
    email: {
        type:String,
        required :true,
        unique:[true,"Email already present in the database"],
        //validator
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error("Invalid Email Id");
            }
        }
    },
    phone: {
        type:Number,
        min:10,
        required:true,
    },
    address:{
        type:String,
        required:true
    }
})

// to define collection..

const Student = new mongoose.model("Student",student_schema);

module.exports = Student;