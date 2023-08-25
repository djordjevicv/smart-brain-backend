const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex');

const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const image = require("./controllers/image");
const leaderboard = require("./controllers/leaderboard");
const profileID = require("./controllers/profile-id");
//const imageURL = require("./controllers/imageURL")

const app = express();

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        port: 5432,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    }
});

//MIDDLEWARE    
app.use(express.json());
app.use(cors());

//ROOT 
//DONE
app.get("/", (req, res) => {
    db.select('*').from('users')
        .then(users => res.json(users))
})

//GETTING THE APP WINDOW BASED ON A PROFILE
//DONE
app.get("/profile/:id", profileID.handleGettingTheUser(db));

//SIGN IN FUNCTIONALITY
app.post("/signin", signIn.handleSignIn(db, bcrypt));

//update the entry count
//DONE
app.put("/image", image.handleImage(db));

//make the API call from the server to keep the API secure
//IN PROGRESS
app.post("/imageURL", imageURL.handleAPICall());

//REGISTRATION OF USERS
//DONE
app.post("/register", register.handleRegister(db, bcrypt));

//GET TOP 5
//DONE
app.get("/leaderboard", leaderboard.getTopUsers(db));

app.listen(3001);

/*
    / --> res = this is working
    /signin --> POST = success/fail
    /register --> put = user
    /profile/:userID --> GET = user
    /image --> PUT --> user
*/