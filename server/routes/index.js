const playerController = require('../controller').playerController;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'lol',
    }));

    app.post('/api/add', playerController.create);
    app.get('/api/players', playerController.list);
    app.get('/api/list', playerController.listTeam);
};