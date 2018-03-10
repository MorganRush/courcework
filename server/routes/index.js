const playersController = require('../controller').player;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'lol',
    }));

    app.post('/api/add', playersController.create);
    app.get('/api/players', playersController.list);
};