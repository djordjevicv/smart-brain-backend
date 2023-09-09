const database = require('../server');
const bcrypt = require('bcrypt-nodejs');

const handleSignIn = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect form submission');
    }
    db('login').select()
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db('users').select()
                    .where('email', '=', email)
                    .then(user => res.json(user[0]))
                    .catch(err => res.status(400).json('unable to get user'));
            }
            else
                res.status(400).json('wrong credentials');
        })
        .catch(err => res.status(400).json('wrong credentials'));
}

module.exports = {
    handleSignIn
}