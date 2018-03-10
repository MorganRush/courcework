const Players = require('../models').players;

module.exports = {
    create(req, res){
        return Players
            .create({
                name: req.body.name,
                surname: req.body.surname,
            })
            .then((player) => res.status(201).send(player))
            .catch((error) => res.status(400).send(error));
    },
    list(req, res) {
        return Players
            .all()
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error));
    },
    lol(req, res) {
        return Players
            .findAll()
    }
};