const Countries = require('../models').countries;

module.exports = {
    list(req, res){
        return Countries
            .all()
            .then(country => res.status(200).send(country))
            .catch(error => res.status(400).send(error));
    },

    listLimit(req, res){
        return Countries
            .findAll({
                limit: req.params.limit,
                offset: (req.params.limit * req.params.offset),
            })
            .then(countries => res.status(200).send(countries))
            .catch(error => res.status(400).send(error));
    },

    listLike(req, res){
        return Countries
            .findAll({
                limit: req.params.limit,
                offset: (req.params.limit * req.params.offset),
                where: { name: { $like: '%' + req.params.like + '%' } },
            })
            .then(countries => res.status(200).send(countries))
            .catch(error => res.status(400).send(error));
    }
};
