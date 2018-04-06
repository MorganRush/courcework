const Players = require('../models').players;
const Contracts = require("../models").contracts;
const Teams = require("../models").teams;
const Countries = require('../models').countries;

module.exports = {
    list(req, res){
        return Players
            .all()
            .then((player) => res.status(200).send(player))
            .catch(error => res.status(400).send(error));
    },
};