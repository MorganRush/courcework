const Players = require('../models').players;
const Contracts = require("../models").contracts;
const Teams = require("../models").teams;
const Countries = require('../models').countries;

module.exports = {
    list(req, res){
        return Contracts
            .findAll({
                include:[{
                    model: Players, as: 'player'
                },{
                    model: Teams, as: 'team',
                    include:[{
                        model: Countries, as: 'country',
                    }]
                }]
            })
            .then(contracts => res.status(200).send(contracts))
            .catch(error => res.status(400).send(error));
    },
    listLimit(req, res){
        return Contracts
            .findAll({
                limit: req.params.limit,
                include:[{
                    model: Players, as: 'player'
                },{
                    model: Teams, as: 'team',
                    include:[{
                        model: Countries, as: 'country',
                    }]
                }]
            })
            .then(contracts => res.status(200).send(contracts))
            .catch(error => res.status(400).send(error));
    },
    listByTeam(req, res){
        return Contracts
            .findAll({
                include:[{
                    model: Players, as: 'player'
                    },{
                    model: Teams, as: 'team',
                    where: { name: req.params.team },
                    include:[{
                        model: Countries, as: 'country',
                    }]
                }],
            })
            .then(contracts => res.status(200).send(contracts))
            .catch(error => res.status(400).send(error));
    },
    listByCountry(req, res){
        return Contracts
            .findAll({
                include:[{
                    model: Players, as: 'player'
                },{
                    model: Teams, as: 'team',
                    include:[{
                        model: Countries, as: 'country',
                        where: { name: req.params.country }
                    }]
                }]
            })
            .then(contracts => res.status(200).send(contracts))
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