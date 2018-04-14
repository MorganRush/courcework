const Players = require('../models').players;
const Contracts = require("../models").contracts;
const Teams = require("../models").teams;
const Countries = require('../models').countries;
const CommentsPlayers = require('../models').commentsPlayers;
const Characteristics = require('../models').characteristics;

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

    one(req, res){
        return Contracts
            .findOne({
                where: {
                    id: req.params.id,
                },
                include: [{
                    model: Characteristics, as: 'characteristics',
                },{
                    model: Players, as: 'player',
                    include: [{
                        model: CommentsPlayers, as: 'commentsPlayers',
                    }]
                },{
                    model: Teams, as: 'team',
                    include: [{
                        model: Countries, as: 'country',
                    }]
                }]
            })
            .then(contract => res.status(200).send(contract))
            .catch(error => res.status(400).send(error));
    },

    listLimit(req, res){
        return Contracts
            .findAll({
                limit: req.params.limit,
                offset: (req.params.limit * req.params.offset),
                include:[{
                    model: Players, as: 'player',
                },{
                    model: Teams, as: 'team',
                    include:[{
                        model: Countries, as: 'country',
                    }]
                }]
            })
            .then(contracts => res.status(200).send(contracts))
            //.catch(error => res.status(400).send(error));
    },

    listLike(req, res){
        console.log("lol");
        return Contracts
            .findAll({
                limit: req.params.limit,
                offset: (req.params.limit * req.params.offset),
                include:[{
                    model: Players, as: 'player',
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
                limit: req.params.limit,
                offset: (req.params.limit * req.params.offset),
                include:[{
                    model: Players, as: 'player',
                },{
                    model: Teams, as: 'team',
                    where: { id: req.params.id },
                    include:[{
                        model: Countries, as: 'country',
                    }]
                }],
            })
            .then(contracts => res.status(200).send(contracts))
            .catch(error => res.status(400).send(error));
    },

    listByTeamLike(req, res){
        return Contracts
            .findAll({
                limit: req.params.limit,
                offset: (req.params.limit * req.params.offset),
                include:[{
                    model: Players, as: 'player',
                    where: { name: { $like: '%' + req.params.like + '%' } }
                },{
                    model: Teams, as: 'team',
                    where: { id: req.params.id },
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
                limit: req.params.limit,
                offset: (req.params.limit * req.params.offset),
                include:[{
                    model: Players, as: 'player',
                },{
                    model: Teams, as: 'team',
                    where: { countryId: req.params.id },
                    include:[{
                        model: Countries, as: 'country',
                        where: { id: req.params.id }
                    }]
                }]
            })
            .then(contracts => res.status(200).send(contracts))
            .catch(error => res.status(400).send(error));
    },

    listByCountryLike(req, res){
        return Contracts
            .findAll({
                limit: req.params.limit,
                offset: (req.params.limit * req.params.offset),
                include:[{
                    model: Players, as: 'player',
                    where: { name: { $like: '%' + req.params.like + '%' } }
                },{
                    model: Teams, as: 'team',
                    where: { countryId: req.params.id },
                    include:[{
                        model: Countries, as: 'country',
                        where: { id: req.params.id }
                    }]
                }]
            })
            .then(contracts => res.status(200).send(contracts))
            .catch(error => res.status(400).send(error));
    },
};