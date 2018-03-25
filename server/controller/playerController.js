const Players = require('../models').players;
const Contracts = require("../models").contracts;
const Teams = require("../models").teams;

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
            .then(players => res.status(200).send(players))
            .catch(error => res.status(400).send(error));
    },
    listLimit(req, res){
        return Players
            .findAll({ limit: req.params.limit })
            .then(players => res.status(200).send(players))
            .catch(error => res.status(400).send(error));
    },
    listTeam(req, res){
        return Contracts
            .findAll({
                include:[{
                    model: Players, as: 'player'
                    },{
                    model: Teams, as: 'team',
                    where: { name: req.params.team }
                }],
            })
            .then(contracts => res.status(200).send(contracts))
            .catch(error => res.status(400).send(error));
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