const mongoose = require("mongoose");
const { Schema } = mongoose;

// NOTE : we gonna use passport in future (for authenication purpose) 

const passportLocalMongoose = require("passport-local-mongoose");

const interviewerSchema = new mongoose.Schema ({

   

    email : {
        type : String,
        unique : true,
        required : true,
    },
    phone : {
        type : Number,
        unique : true,
        
    },

    name : {
        type : String,
        required : true,
    },

    location : {
        type : String,
        
    },

    jobTitle : {
        type : String,
        
    },

    experienceLevel : {
        type : String,
        enum : ["Mid-level" , "Senior-level" , "Executive-level"],
    },

    interviewExpertise : {
        type : String,
        
    },

    linkedIn : {
        type : String,
    }








    //NOTE : other fields will be added after discussion 
    
});

interviewerSchema.plugin(passportLocalMongoose);
const interviewerDetails = mongoose.model("interviewerDetails" , interviewerSchema );

module.exports = interviewerDetails;