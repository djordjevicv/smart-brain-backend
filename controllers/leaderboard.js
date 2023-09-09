const getTopUsers = (req, res) => {

    const { db } = require('../server');

    db('users').select('name', 'entries')
        .orderBy('entries', 'desc')
        .limit(5)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('unable to get users'));
}

module.exports = {
    getTopUsers
}