const FavoritesPlayer = require('../models').favoritesPlayer;

module.exports = {
  create(req, res) {
    return FavoritesPlayer
      .create({
        userID: req.user.id,
        playerID: req.params.id,
      })
      .then((team) => res.status(201).send(team))
      .catch((error) => res.status(400).send(error));
  },
};
