const Countries = require('../models').countries;

module.exports = {
    list(req, res){
        return Countries
            .all()
            .then(country => res.status(200).send(country))
            .catch(error => res.status(400).send(error));
    }
};
