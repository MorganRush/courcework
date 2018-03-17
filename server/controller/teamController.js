const Teams = require('../models').teams;

module.exports = {
    create(req, res){
        return Teams
            .create({
                name: req.body.name,
            })
            .then((player) => res.status(201).send(player))
            .catch((error) => res.status(400).send(error));
    },
    list(req, res) {
        return Teams
            .all()
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error));
    },
};