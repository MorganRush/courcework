const Players = require('../models').players;

module.exports = {
    list(req, res){
        return Players
            .all()
            .then((player) => res.status(200).send(player))
            .catch(error => res.status(400).send(error));
    },

    one(req, res){
        return Players
            .findOne({ where: {name: req.params.name }})
            .then((player) => res.status(200).send(player))
            .catch(error => res.status(400).send(error));
    },

    create(req, res){
        return Players
            .create({
                name: req.body.name,
            })
            .then((player) => res.status(201).send(player))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Players
            .findById(req.params.id)
            .then(player => {
                if (!player) {
                    return res.status(404).send({
                        message: 'Player Not Found',
                    });
                }
                return player
                    .update({
                        name: req.body.name || player.name,
                    })
                    .then(() => res.status(200).send(player))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res){
        return Players
            .findById(req.params.id)
            .then(player => {
                if (!player) {
                    return res.status(400).send({
                        message: 'Player Not Found',
                    });
                }
                return player
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
};