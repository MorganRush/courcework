const playerController = require('../controller').playerController;
const authorizationController = require('../controller').authorizationController;
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
        resp.redirect('/api');
    };

    app.get('/', (req, res) =>{
        res.redirect('/signin');
    });

    app.get('/signin', isNotLoggedIn, authorizationController.signin);
    app.get('/signup', isNotLoggedIn, authorizationController.signup);
    app.get('/logout', isLoggedIn, authorizationController.logout);

    app.post('/signin', passport.authenticate('local-signin', {
        badRequestMessage: 'Заполните ВСЕ поля.',
        successRedirect: '/api',
        failureRedirect: '/signin.html?error=true',
        failureFlash: true
    }));

    app.post('/signup', passport.authenticate('local-signup', {
        badRequestMessage: 'Заполните ВСЕ поля.',
        successRedirect: '/api',
        failureRedirect: '/signup.html?error=true',
        failureFlash: true,
    }));

    app.get('/api', isLoggedIn, (req, res) => res.status(200).send({
        message: 'hw',
    }));
    app.post('/api/add', isLoggedIn, playerController.create);
    app.get('/api/players', playerController.list);
    app.get('/api/teams/:team/players', playerController.listByTeam);
    app.get('/api/players/:limit', playerController.listLimit);
    app.get('/api/countries/:country/players', playerController.listByCountry);
    app.get('/api/full', playerController.listFull);

    app.get('/api/test', load.addToDB);
};