const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex');

const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const image = require("./controllers/image");
const leaderboard = require("./controllers/leaderboard");
const profileID = require("./controllers/profile-id");
const imageURL = require("./controllers/imageURL")

const app = express();

//CONNECTION TO THE DATABASE
const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
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

//ENDPOINTS
app.get("/", (req, res) => {
    db.select('*').from('users')
        .then(users => res.json(users))
})

app.get("/profile/:id", profileID.handleGettingTheUser(db));    

app.post("/signin", (req, res) => signIn.handleSignIn(req, res));

app.put("/image", image.handleImage(db));

app.post("/imageURL", imageURL.handleAPICall());

app.post("/register", register.handleRegister(db, bcrypt));

app.get("/leaderboard", leaderboard.getTopUsers(db));

app.listen(3001);

module.exports = {
    db, bcrypt
}