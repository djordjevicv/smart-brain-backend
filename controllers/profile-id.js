const handleGettingTheUser = (req, res) => {

    const { db } = require('../server');

    const { id } = req.params;
    db.select('*').where('id', id).from('users')
        .then(user => {
            if (!user.length)
                res.status(400).json("User doesn't exist!");
            res.json(user[0]);
        })
        .catch(error => res.status(400).json("Error while loading the user!"));
}

module.exports = {
    handleGettingTheUser
}