const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const session = require("express-session");
const interviewerDetails = require("./models/interviewer.js");
const candidateDetails = require("./models/candidate.js");

const app = express();
const PORT = 3000;




// DB CONNECTION



main().then(res => console.log("DB connected"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/sihproject');
}



// GENERAL MIDDLEWARES



app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(express.json());




// ROUTES



app.get("/" , (req,res) => {
    res.send("testing!");
});


app.listen(PORT, () => {
    console.log(`Server is ready on http://localhost:${PORT}/`)
});