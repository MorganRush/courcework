const playerController = require('../controller').playerController;
const authorizationController = require('../controller').authorizationController;
const teamController = require('../controller').teamController;
const countriesController = require('../controller').countriesController;
const load = require('../load').load;

module.exports = (app, passport) => {

    const isLoggedIn = (req, resp, next) => {
        if (req.isAuthenticated())
            return next();
        resp.redirect('/signin');
    };

    const isNotLoggedIn = (req, resp, next) => {
        if (!req.isAuthenticated())
            return next();
        resp.redirect('/main');
    };

    app.get('/', (req, res) =>{
        res.redirect('/main');
    });

    app.get('/signin', isNotLoggedIn, authorizationController.signin);
    app.get('/signup', isNotLoggedIn, authorizationController.signup);
    app.get('/logout', isLoggedIn, authorizationController.logout);

    app.post('/signin', passport.authenticate('local-signin', {
        badRequestMessage: 'Заполните ВСЕ поля.',
        successRedirect: '/main',
        failureRedirect: '/signin.html?error=true',
        failureFlash: true
    }));
    app.post('/signup', passport.authenticate('local-signup', {
        badRequestMessage: 'Заполните ВСЕ поля.',
        successRedirect: '/main',
        failureRedirect: '/signup.html?error=true',
        failureFlash: true,
    }));

    app.get('/main', isLoggedIn, (req, res) => res.status(200).send({
        message: 'hw',
    }));

    app.get('/main/players/team/:team', playerController.listByTeam);
    app.get('/main/players/:limit', playerController.listLimit);
    app.get('/main/players/country/:country', playerController.listByCountry);
    app.get('/main/players', playerController.list);

    app.get('/main/teams', teamController.list);
    app.get('/main/teams/:limit', teamController.listLimit);
    app.get('/main/teams/country/:country', teamController.listByCountry);

    app.get('/main/test', load.addToDB);
};