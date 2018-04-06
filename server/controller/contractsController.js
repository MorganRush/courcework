const Players = require('../models').players;
const Contracts = require("../models").contracts;
const Teams = require("../models").teams;
const Countries = require('../models').countries;
const CommentsPlayers = require('../models').commentsPlayers;

module.exports = {
    list(req, res){
        return Contracts
            .findAll({
                include:[{
                    model: Players, as: 'player',
                    include:[{
                        model: CommentsPlayers, as: 'commentsPlayers',
                    }]
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
                offset: (req.params.limit * req.params.offset),
                include:[{
                    model: Players, as: 'player',
                    include:[{
                        model: CommentsPlayers, as: 'commentsPlayers',
                    }]
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

    listLike(req, res){
        console.log("lol");
        return Contracts
            .findAll({
                limit: req.params.limit,
                include:[{
                    model: Players, as: 'player',
                    include:[{
                        model: CommentsPlayers, as: 'commentsPlayers',
                    }],
                    where: { name: { $like: '%' + req.params.like + '%' } }
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
                    model: Players, as: 'player',
                    include:[{
                        model: CommentsPlayers, as: 'commentsPlayers',
                    }]
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
                    model: Players, as: 'player',
                    include:[{
                        model: CommentsPlayers, as: 'commentsPlayers',
                    }]
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
};