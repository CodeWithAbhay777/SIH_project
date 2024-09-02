const mongoose = require("mongoose");
const { Schema } = mongoose;


const scientistBSchema = new mongoose.Schema({

    question : {
        type : String,
        unique : true,
    },

    realAnswer : {
        type: String,
    },

    answerByCandidate : {
        type : String,
    },

    explainationByChatGPT : {
        type : String,
    }


});

const scientistBquestionBank = mongoose.model("scientistBquestionBank", scientistBSchema);

module.exports = scientistBquestionBank;