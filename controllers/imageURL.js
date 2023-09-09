const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_KEY
});

const handleAPICall = (req, res) => {
    app.models.predict('face-detection', req.body.input)
        .then(data => res.json(data))
        .catch(err => res.status(400).json('unable to communicate with API'));
}

module.exports = {
    handleAPICall
}