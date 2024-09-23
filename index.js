

const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const OpenAI = require("openai");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

const userS = [], userI = [];
let messages = [];

//dont expose this api key baad mein env mein daal dunga

// const secretKey = "";

const cors = require('cors');

const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true
});

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const interviewerDetails = require("./models/interviewer.js");
const scientistBquestionBank = require("./models/scientistB.js");
const candidateDetails = require("./models/candidate.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { link } = require("fs/promises");
const { wrap } = require("module");


const PORT = 3000;




// DB CONNECTION



main().then(res => console.log("DB connected"))
    .catch(err => console.log(err));

async function main() {
    // await mongoose.connect('mongodb://127.0.0.1:27017/sihproject');
    await mongoose.connect('mongodb+srv://code_with_abhay:Avenger14%23@cluster0.g3cy5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
}



// GENERAL MIDDLEWARES


// const openai = new OpenAI({
//     apiKey: secretKey
// });

app.use(cors());
app.use('/peerjs', peerServer);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(express.json());



const sessionOptions = {
    secret: "Avenger14#",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 14 * 24 * 60 * 60 * 1000,
        maxAge: 14 * 24 * 60 * 60 * 1000,
    }

};

app.use(session(sessionOptions));



app.use(passport.initialize());
app.use(passport.session());


passport.use("interviewer", new LocalStrategy(interviewerDetails.authenticate()));
passport.serializeUser(interviewerDetails.serializeUser());
passport.deserializeUser(interviewerDetails.deserializeUser());

passport.use("candidate", new LocalStrategy(candidateDetails.authenticate()));
passport.serializeUser(candidateDetails.serializeUser());
passport.deserializeUser(candidateDetails.deserializeUser());





// ROUTES


// app.get("/login", (req, res) => {
//     res.render("login");
// });


app.get("/register", (req, res) => {
    res.render("register");
});



app.get("/", (req, res) => {

    let userData = null;
    req.session.counter = 0;


    if (!req.session.usedInProfilePage) {
        res.render("index", { userData });
    }
    else {
        userData = req.session.usedInProfilePage;

        if (userData.type === "interviewer") {
            req.session.counter = 1;
            console.log("session counter : ", req.session.counter)
            req.session.interviewerIdForRoom = userData.userId;
            // console.log(req.session.interviewerIdForRoom);

        }

        else if (userData.type === "candidate") {
            req.session.counter = 2;
            console.log("session counter : ", req.session.counter)
            req.session.candidateIdForRoom = userData.userId;
            // console.log(req.session.candidateIdForRoom);

        }






        res.render("index", { userData });


        // res.render("index", { userData });
    }
});

app.get("/interviewer/profile", (req, res) => {
    let usedInProfilePage = req.session.usedInProfilePage;


    res.render("interviewer", { usedInProfilePage });
});

app.get("/candidate/profile", (req, res) => {
    let usedInProfilePage = req.session.usedInProfilePage;
    res.render("candidate", { usedInProfilePage });
});

app.get("/interviewer/profile/:id", wrapAsync(async (req, res) => {

    let { id } = req.params;

    let dataToShowInProfileSection = await interviewerDetails.findById({ _id: id });


    console.log(dataToShowInProfileSection);

    res.render("interviewerProfile", { dataToShowInProfileSection });
}));

app.get("/candidate/profile/:id", wrapAsync(async (req, res) => {

    let { id } = req.params;

    let dataToShowInProfileSection = await candidateDetails.findById({ _id: id });

  
    console.log(dataToShowInProfileSection);
    res.render("candidateProfile", { dataToShowInProfileSection });
}));

// app.get("/candidate/profile", (req, res) => {
//     let usedInProfilePage = req.session.usedInProfilePage;
//     res.render("candidate", { usedInProfilePage });
// });




app.get("/jobs", (req, res) => {
    res.render("jobs");
});

app.get("/contactUs", (req, res) => {
    res.render("contact");

});



// register/login post routes


app.post("/register", wrapAsync(async (req, res) => {
    let { username, email, userType, password } = req.body;

    if (userType === "interviewer") {

        try {
            let userInfo = new interviewerDetails({
                username: username,
                email: email,

            });

            let user = await interviewerDetails.register(userInfo, password);

            let usedInProfilePage = {

                email: email,
                userId: user._id,

                type: "interviewer",
            };

            req.session.usedInProfilePage = usedInProfilePage;

            req.session.save(() => {
                res.redirect("/interviewer/profile");
            });

        } catch (error) {
            console.error("Registration Error: ", error);
            res.redirect("/register");
        }

    }
    else if (userType === "candidate") {

        try {

            let userInfo = new candidateDetails({
                username: username,
                email: email,


            });

            let user = await candidateDetails.register(userInfo, password);

            let usedProfileEntries = {

                email: email,

                userId: user._id,
                type: "candidate",

            }

            req.session.usedInProfilePage = usedProfileEntries;

            req.session.save(() => {
                res.redirect("/candidate/profile")
            });

        } catch (error) {
            console.error("Registration Error: ", error);
            res.redirect("/register");
        }





    }



}));


app.post("/interviewer/profile", wrapAsync(async (req, res) => {
    let { email, phone, name, location, jobTitle, experienceLevel, interviewExpertise, linkedIn } = req.body;

    let userId = req.session.usedInProfilePage.userId;

    let user = await interviewerDetails.findById({ _id: userId });

    user.email = email;
    user.phone = phone;
    user.name = name;
    user.location = location;
    user.jobTitle = jobTitle;
    user.experienceLevel = experienceLevel;
    user.interviewExpertise = interviewExpertise;
    user.linkedIn = linkedIn;

    await user.save();


    res.redirect("/");

}));

app.post("/candidate/profile", wrapAsync(async (req, res) => {
    let { email, phone, name, location, jobTitle, education, industry, skills } = req.body;

    let userId = req.session.usedInProfilePage.userId;

    let user = await candidateDetails.findById({ _id: userId });

    user.email = email;
    user.phone = phone;
    user.name = name;
    user.location = location;
    user.jobTitle = jobTitle;
    user.education = education;
    user.industry = industry;
    user.skills = skills;

    await user.save();


    res.redirect("/");


}));


app.post('/login', wrapAsync(async (req, res, next) => {

    let { userType, username, password } = req.body;
    let strategy = userType === 'interviewer' ? 'interviewer' : 'candidate';



    passport.authenticate(strategy, async (err, user, info) => {
        if (err) {

            return res.redirect('/login');
        }
        if (!user) {
            console.log("User not found or wrong credentials");
            console.log(username, password);
            return res.redirect('/register');
        }

        req.logIn(user, async (err) => {
            if (err) {
                console.error("Error during login:", err);
                return res.redirect('/login');
            }

            try {
                let userData;
                if (userType === 'interviewer') {
                    userData = {
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        userId: user._id,
                        type: 'interviewer',
                    };
                } else if (userType === 'candidate') {
                    userData = {
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        userId: user._id,
                        type: 'candidate',
                    };
                }



                req.session.usedInProfilePage = userData;

                req.session.save(() => {
                    res.redirect('/');
                });
            } catch (error) {
                console.error('Error setting session:', error);
                res.redirect('/register');
            }
        });
    })(req, res, next);






}));



// ROOM 


app.post("/newID", (req, res) => {
    res.redirect(`/newID/${uuidv4()}`);
});

app.get("/newID/:room", async (req, res) => {

    try {
        let user = null;
        let int_questions = null;
        let sendingCandidateProfileToInterviewer = null;

        if (req.session.counter === 1) {
            let requiredId = req.session.interviewerIdForRoom;
            user = await interviewerDetails.findById({ _id: requiredId });
            int_questions = await scientistBquestionBank.find({});
            // sendingCandidateProfileToInterviewer = await candidateDetails.findById({ _id: '66cea0a36c05d8f92bf365e7' });

            sendingCandidateProfileToInterviewer = {
                name : "demoCandidate",
        
                email : "candidateDemoMail@gmail.com",
        
                phone : 9756348723,
        
                location :"jabalpur",
        
                education : "Btech(Electronics and Communication Engineering)" , 
        
                jobTitle : "ScientistB",
        
                industry : "Technology",
        
                skills : "Python , C++ , C , JAVA , JAVASCRIPT",
        
            }




            if (user) {
                user = user.toObject();
                user.type = "interviewer";

            }
        } else if (req.session.counter === 2) {
            let requiredId = req.session.candidateIdForRoom;
            user = await candidateDetails.findById({ _id: requiredId });
            int_questions = await scientistBquestionBank.find({});
            // sendingCandidateProfileToInterviewer = await candidateDetails.findById({ _id: '66cea0a36c05d8f92bf365e7' });

            sendingCandidateProfileToInterviewer = {
                name : "demoCandidate",
        
                email : "candidateDemoMail@gmail.com",
        
                phone : 9756348723,
        
                location :"jabalpur",
        
                education : "Btech(Electronics and Communication Engineering)" , 
        
                jobTitle : "ScientistB",
        
                industry : "Technology",
        
                skills : "Python , C++ , C , JAVA , JAVASCRIPT",
        
            }




            if (user) {
                user = user.toObject();
                user.type = "candidate";



            }
        }
        else {
            console.log("req.session is : ", req.session.counter);
        }
        console.log(sendingCandidateProfileToInterviewer);



        res.render('room.ejs', { roomId: req.params.room, userDataForRoom: user, int_questions, sendingCandidateProfileToInterviewer });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Internal Server Error");
    }



});

app.post("/join", (req, res) => {
    let { id } = req.body;

    res.redirect(`/newID/${id}`);

});


//chatgpt api

// app.post("/checkAnswers", wrapAsync(async (req, res) => {
//     let { answerByCandidate = "nothing", questionAsked = "nothing" } = req.body;


//     let realAnswerOfQuestion = await scientistBquestionBank.findOne({ question: questionAsked });



//     let task = `The question asked by the interviewer(DRDO scientist B ECE) is ${questionAsked} . The answer of this question is ${realAnswerOfQuestion} , and the answer given by a candidate is ${answerByCandidate} . Check how similar the answer is to real answer by checking some keypoints etc. and give marks according to you. `



//     messages.push({ "role": "user", "content": `${task}` });

//     try {

//         let response = await openai.chat.completions.create({
//             model: 'gpt-3.5-turbo',

//             messages: messages,

//         });



//         if (response) {

//             let reply = response.choices[0].message.content;

//             res.status(200).json({ msg: reply });
//         }
//         else {

//             res.status(404).json({ msg: "Data not found" });

//         }

//     } catch (error) {

//         console.log(error);
//         res.status(500).send({ msg: "Something went wrong!" })

//     }


// }));



//WEB-SOCKET SERVER



io.on('connection', socket => {

    socket.on('join-room', (roomId, userId) => {

        userS.push(socket.id);
        userI.push(userId);
        //console.log("room Id:- " + roomId,"userId:- "+ userId);   

        //join Room
        console.log("room Id:- " + roomId, "userId:- " + userId);
        socket.join(roomId);

        socket.to(roomId).emit('user-connected', userId);

        //Remove User
        socket.on('removeUser', (sUser, rUser) => {
            let i = userS.indexOf(rUser);
            if (sUser == userI[0]) {
                console.log("SuperUser Removed" + rUser);
                socket.to(roomId).emit('remove-User', rUser);
            }
        });

        //grid
        socket.on('obect', (sUser, object) => {
            if (sUser == userI[0]) {
                socket.to(roomId).emit('grid_obj', object);
            }
        });

        //code to message in roomId
        socket.on('message', (message, yourName) => {
            console.log(message);
            io.to(roomId).emit('createMessage', message, yourName);

        });


        //questions from interviewer

        socket.on('question-selected', (question) => {

            socket.broadcast.emit('display-question', question);
        });




        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });


        //code for whiteboard

        socket.on('startDrawing', (data) => {
            socket.broadcast.emit('startDrawing', data);
        });

        // Handle drawing event
        socket.on('drawing', (data) => {
            socket.broadcast.emit('drawing', data);
        });

        // Handle stop drawing event
        socket.on('stopDrawing', () => {
            socket.broadcast.emit('stopDrawing');
        });

        // Handle clear canvas event
        socket.on('clearCanvas', () => {
            socket.broadcast.emit('clearCanvas');
        });




        socket.on('disconnect', () => {
            //userS.filter(item => item !== userId);
            var i = userS.indexOf(socket.id);
            userS.splice(i, 1);
            socket.to(roomId).emit('user-disconnected', userI[i], userI);
            //update array

            userI.splice(i, 1);
        });
        socket.on('seruI', () => {
            socket.emit('all_users_inRoom', userI);
            //console.log(userS);
            console.log(userI);
        });
    })

});


//ERROR MIDDLEWARES AND * ROUTE

// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page not found"));
// })

app.use((err, req, res, next) => {

    let { status = 500, message = "Something went wrong" } = err;
    console.log(err.name);
    console.log("-----------------------------------------------------------------");
    console.log(err);
    res.status(status).render("error.ejs", { message });
});





// io.engine.on("connection_error", (err) => {
//     console.log(err.req);      // the request object
//     console.log(err.code);     // the error code, for example 1
//     console.log(err.message);  // the error message, for example "Session ID unknown"
//     console.log(err.context);  // some additional error context
// });
















server.listen(PORT, () => {
    console.log(`Server is ready on http://localhost:${PORT}/`)
});