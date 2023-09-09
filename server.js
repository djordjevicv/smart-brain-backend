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

app.get("/profile/:id", (req, res) => profileID.handleGettingTheUser(req, res));    

app.post("/signin", signIn.handleSignIn);

app.put("/image", (req, res) => image.handleImage(req, res));

app.post("/imageURL", (req, res) => imageURL.handleAPICall(req, res));

app.post("/register", (req, res) => register.handleRegister(req, res));

app.get("/leaderboard", (req, res) => leaderboard.getTopUsers(req, res));

app.listen(3001);

module.exports = {
    db, bcrypt
}