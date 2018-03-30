const Contracts = require("../models").contracts;
const Teams = require("../models").teams;
const Cities = require('../models').cities;
const Countries = require('../models').countries;

module.exports = {
    create(req, res){
        return Teams
            .create({
                name: req.body.name,
            })
            .then((team) => res.status(201).send(team))
            .catch((error) => res.status(400).send(error));
    },
    list(req, res) {
        return Teams
            .all()
            .then(teams => res.status(200).send(teams))
            .catch(error => res.status(400).send(error));
    },
    listLimit(req, res){
        return Teams
            .findAll({ limit: req.params.limit })
            .then(teams => res.status(200).send(teams))
            .catch(error => res.status(400).send(error));
    },
    listByCountry(req, res){
        return Teams
            .findAll({
                include:[{
                    model: Countries, as: 'country',
                    where: { name: req.params.country }
                }]
            })
            .then(teams => res.status(200).send(teams))
            .catch(error => res.status(400).send(error));
    },
};