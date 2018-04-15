const Teams = require("../models").teams;
const Countries = require('../models').countries;

module.exports = {
    list(req, res) {
        return Teams
            .findAll()
            .then(teams => res.status(200).send(teams))
            .catch(error => res.status(400).send(error));
    },

    listLimit(req, res){
        return Teams
            .findAll({
                limit: req.params.limit,
                offset: (req.params.limit * req.params.offset),
            })
            .then(teams => res.status(200).send(teams))
            .catch(error => res.status(400).send(error));
    },

    listLike(req, res){
        return Teams
            .findAll({
                limit: req.params.limit,
                offset: (req.params.limit * req.params.offset),
                where: { name: { $like: '%' + req.params.like + '%' } },
            })
            .then(teams => res.status(200).send(teams))
            .catch(error => res.status(400).send(error));
    },

    create(req, res){
        return Teams
            .create({
                name: req.body.name,
            })
            .then((team) => res.status(201).send(team))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return Teams
            .findById(req.params.id)
            .then(team => {
                if (!team) {
                    return res.status(404).send({
                        message: 'Team Not Found',
                    });
                }
                return team
                    .update({
                        name: req.body.name || team.name,
                    })
                    .then(() => res.status(200).send(team))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res){
        return Teams
            .findById(req.params.id)
            .then(team => {
                if (!team) {
                    return res.status(400).send({
                        message: 'Team Not Found',
                    });
                }
                return team
                    .destroy()
                    .then(() => res.status(204).send(team))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};