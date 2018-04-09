const Players = require('../models').players;
const Contracts = require("../models").contracts;
const Teams = require("../models").teams;
const Countries = require('../models').countries;
const FavoritesPlayer = require('../models').favoritesPlayer;

module.exports = {
    list(req, res){
        return Players
            .findAll({
                include: [{
                    model: FavoritesPlayer, as: 'favoritesPlayer',
                    where: { userID: req.user.id }
                }]
            })
            .then((players) => res.status(200).send(players))
            .catch(error => res.status(400).send(error));
    },
};