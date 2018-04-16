const Players = require('../models').players;
const Contracts = require("../models").contracts;
const Teams = require("../models").teams;
const Countries = require('../models').countries;
const CommentsPlayers = require('../models').commentsPlayers;
const Characteristics = require('../models').characteristics;
const FavoritesPlayer = require('../models').favoritesPlayer;
const Users = require('../models').users;

module.exports = {
  list(req, res) {
    return Contracts
      .findAll({
        include: [{
          model: Players, as: 'player',
          include: [{
            model: CommentsPlayers, as: 'commentsPlayers',
          }, {
            model: Countries, as: 'country',
          }],
        }, {
          model: Teams, as: 'team',
        }]
      })
      .then(contracts => res.status(200).send(contracts))
      .catch(error => res.status(400).send(error));
  },

  one(req, res) {
    return Contracts
      .findOne({
        where: {
          id: req.params.id,
        },
        include: [{
          model: Characteristics, as: 'characteristics',
        }, {
          model: Players, as: 'player',
          include: [{
            model: CommentsPlayers, as: 'commentsPlayers',
            include: [{
              model: Users, as: 'user',
            }]
          }, {
            model: Countries, as: 'country',
          }]
        }, {
          model: Teams, as: 'team',
        }]
      })
      .then(contract => res.status(200).send(contract))
      //.catch(error => res.status(400).send(error));
  },

  listLimit(req, res) {
    return Contracts
      .findAll({
        limit: req.params.limit,
        offset: (req.params.limit * req.params.offset),
        include: [{
          model: Players, as: 'player',
          include: [{
            model: Countries, as: 'country',
          }]
        }, {
          model: Teams, as: 'team',
        }]
      })
      .then(contracts => res.status(200).send(contracts))
      .catch(error => res.status(400).send(error));
  },

  listLike(req, res) {
    return Contracts
      .findAll({
        limit: req.params.limit,
        offset: (req.params.limit * req.params.offset),
        include: [{
          model: Players, as: 'player',
          include: [{
            model: Countries, as: 'country',
          }],
          where: { name: { $like: '%' + req.params.like + '%' } }
        }, {
          model: Teams, as: 'team',
        }]
      })
      .then(contracts => res.status(200).send(contracts))
      .catch(error => res.status(400).send(error));
  },

  listByTeam(req, res) {
    return Contracts
      .findAll({
        limit: req.params.limit,
        offset: (req.params.limit * req.params.offset),
        include: [{
          model: Players, as: 'player',
          include: [{
            model: Countries, as: 'country',
          }]
        }, {
          model: Teams, as: 'team',
          where: { id: req.params.id },
        }],
      })
      .then(contracts => res.status(200).send(contracts))
      .catch(error => res.status(400).send(error));
  },

  listByTeamLike(req, res) {
    return Contracts
      .findAll({
        limit: req.params.limit,
        offset: (req.params.limit * req.params.offset),
        include: [{
          model: Players, as: 'player',
          include: [{
            model: Countries, as: 'country',
          }],
          where: { name: { $like: '%' + req.params.like + '%' } }
        }, {
          model: Teams, as: 'team',
          where: { id: req.params.id },
        }],
      })
      .then(contracts => res.status(200).send(contracts))
      .catch(error => res.status(400).send(error));
  },

  listByCountry(req, res) {
    return Contracts
      .findAll({
        limit: req.params.limit,
        offset: (req.params.limit * req.params.offset),
        include: [{
          model: Players, as: 'player',
          include: [{
            model: Countries, as: 'country',
            where: { id: req.params.id }
          }],
          where: { countryId: req.params.id },
        }, {
          model: Teams, as: 'team',
        }]
      })
      .then(contracts => res.status(200).send(contracts))
      .catch(error => res.status(400).send(error));
  },

  listByCountryLike(req, res) {
    return Contracts
      .findAll({
        limit: req.params.limit,
        offset: (req.params.limit * req.params.offset),
        include: [{
          model: Players, as: 'player',
          include: [{
            model: Countries, as: 'country',
            where: { id: req.params.id }
          }],
          where: {
            name: { $like: '%' + req.params.like + '%' },
            countryId: req.params.id
          }
        }, {
          model: Teams, as: 'team',
        }]
      })
      .then(contracts => res.status(200).send(contracts))
      .catch(error => res.status(400).send(error));
  },

  listFavorite(req, res) {
    return Contracts
      .findAll({
        limit: req.params.limit,
        offset: (req.params.limit * req.params.offset),
        include: [{
          model: Players, as: 'player',
          include: [{
            model: Countries, as: 'country',
          },{
            model: FavoritesPlayer, as: 'favoritesPlayer',
            where: { userID: req.user.id }
          }],
        },{
          model: Teams, as: 'team',
        }]
      })
      .then((players) => res.status(200).send(players))
      .catch(error => res.status(400).send(error));
  },

  listFavoriteLike(req, res) {
    return Contracts
      .findAll({
        limit: req.params.limit,
        offset: (req.params.limit * req.params.offset),
        include: [{
          model: Players, as: 'player',
          include: [{
            model: Countries, as: 'country',
          },{
            model: FavoritesPlayer, as: 'favoritesPlayer',
            where: { userID: req.user.id }
          }],
          where: { name: { $like: '%' + req.params.like + '%' } }
        }, {
          model: Teams, as: 'team',
        }]
      })
      .then(contracts => res.status(200).send(contracts))
      .catch(error => res.status(400).send(error));
  },
};
