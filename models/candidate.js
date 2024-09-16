const mongoose = require("mongoose");
const { Schema } = mongoose;

const passportLocalMongoose = require("passport-local-mongoose");

// NOTE : we gonna use passport in future (for authenication purpose) 

const candidateSchema = new mongoose.Schema({



    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: Number,
        unique: true,
        required: true,

    },

    name: {
        type: String,
        required: true,
    },

    location: {
        type: String,

    },

    education: {
        type: String,



        enum: ["Btech(Computer Science Engineering)", "Btech(Electronics and Communication Engineering)", "Btech(Mechanical Engineering)", "Btech(Electrical Engineering)", "Btech(Aerospace Engineering)", "Btech(Chemical Engineering)", "Btech(Civil Engineering)", "Mtech(Computer Science Engineering)", "Mtech(Electronics and Communication Engineering)", "Mtech(Mechanical Engineering)", "Mtech(Electrical Engineering)", "Mtech(Aerospace Engineering)", "Mtech(Civil Engineering)", "BSc", "MSc", "Ph.D."],

    },

    jobTitle: {
        type: String,

    },

    industry: {
        type: String,

        enum : ["Technology" , "Science" , "Research"]

    },

    skills: {
        type: String,

    },

    

    //NOTE : other fields will be added after discussion 

});

candidateSchema.plugin(passportLocalMongoose);
const candidateDetails = mongoose.model("candidateDetails", candidateSchema);

module.exports = candidateDetails;