const playerController = require('../controller').playerController;
const authorizationController = require('../controller').authorizationController;

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
    app.get('logout', isNotLoggedIn, authorizationController.logout);

    app.post('/signin', passport.authenticate('local-signin', {
        badRequestMessage: 'Заполните ВСЕ поля.',
        successRedirect: '/api',
        failureRedirect: '/signin',
        failureFlash: true
    }));

    app.post('/signup', passport.authenticate('local-signup', {
        badRequestMessage: 'Заполните ВСЕ поля.',
        successRedirect: '/signin',
        failureRedirect: '/signup',
        failureFlash: true,
    }));

    app.get('/api', isLoggedIn, (req, res) => res.status(200).send({
        message: 'lol',
    }));
    app.post('/api/add', isLoggedIn, playerController.create);
    app.get('/api/players', isLoggedIn, playerController.list);
    app.get('/api/list', isLoggedIn, playerController.listTeam);
};