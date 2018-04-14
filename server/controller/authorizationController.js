const User = require('../models').users;

module.exports = {
    signin(req, res){
        res.redirect('/signin.html');
    },

    signup(req, res){
        res.redirect('/signup.html');
    },

    logout: (req, resp) => {
        req.session.destroy(function (err) {
            resp.redirect('/signin');
        });
    },

    getUserName: (req, res) => {
        return User
            .findAll({
                where: { id: req.user.id }
            })
            .then((user) => {
                let userSend = {};
                userSend.login = user[0].dataValues.login;
                res.status(200).send(userSend);
            })
            .catch(error => res.status(400).send(error));
    }
};