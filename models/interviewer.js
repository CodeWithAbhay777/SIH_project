const mongoose = require("mongoose");
const { Schema } = mongoose;

// NOTE : we gonna use passport in future (for authenication purpose) 

const interviewerSchema = new mongoose.Schema ({

    username : {
        type : String,
        required : true,
        unique : true,
    },

    password : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        unique : true,
    },
    phone : {
        type : Number,
        unique : true,
        
    },

    //NOTE : other fields will be added after discussion 
    
});


const interviewerDetails = mongoose.model("interviewerDetails" , interviewerSchema );

module.exports = interviewerDetails;