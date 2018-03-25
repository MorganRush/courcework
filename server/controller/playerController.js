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
            .findAll({ limit: 10 })
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
                    where: { name: req.body.name }
                }],
            })
            .then(players => res.status(200).send(players))
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Players
    },
    delete(req, res){
        return Players
    }
};