const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'ef9a269a7b0a4d2aaf30c54daf3acd68'
});

const handleAPICall = () => (req, res) => {
    app.models.predict('face-detection', req.body.input)
        .then(data => res.json(data))
        .catch(err => res.status(400).json('unable to communicate with API'));
}

module.exports = {
    handleAPICall
}