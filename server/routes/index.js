const playerController = require('../controller').playerController;
const authorizationController = require('../controller').authorizationController;
const teamController = require('../controller').teamController;
const countriesController = require('../controller').countriesController;
const contractsController = require('../controller').contractsController;
const load = require('../load').load;
const favoritesController = require('../controller').favoritesController;

module.exports = (app, passport) => {

    const isLoggedIn = (req, res, next) => {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    };

    const isNotLoggedIn = (req, res, next) => {
        if (!req.isAuthenticated())
            return next();
        res.redirect('/main');
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

    app.get('/main/contracts/:id', contractsController.one);
    app.get('/main/contracts/:limit/:offset', contractsController.listLimit);
    app.get('/main/contracts/like/:limit/:offset/:like', contractsController.listLike);

    app.get('/main/contracts/team/:id/:limit/:offset', contractsController.listByTeam);
    app.get('/main/contracts/team/like/:id/:limit/:offset/:like', contractsController.listByTeamLike);

    app.get('/main/contracts/country/:id/:limit/:offset', contractsController.listByCountry);
    app.get('/main/contracts/country/like/:id/:limit/:offset/:like', contractsController.listByCountryLike);

    app.get('/main/favorites/players', favoritesController.list);

    app.get('/main/teams/:limit/:offset', teamController.listLimit);
    app.get('/main/teams/like/:limit/:offset/:like', teamController.listLike);
    app.get('/main/teams/country/:country', teamController.listByCountry);

    app.get('/main/countries/like/:limit/:offset/:like', countriesController.listLike);
    app.get('/main/countries/:limit/:offset', countriesController.listLimit);

    app.get('/main/user/', (req, res, next) => {
        if (req.isAuthenticated())
            return next();
        res.status(200).send({"login": null});
    }, authorizationController.getUserName);


        app.get('/main/load/countries', load.addCountriesToDB);
    // app.get('/main/load/teams', load.addTeamsToDB);
    // app.get('/main/load/players', load.addPlayersToDB);
    // app.get('/main/load/contracts', load.addContractsAndPlayerStatisticsToDB);
    //app.get('/main/load/characteristics', load.addCharacteristicsToDB);
};