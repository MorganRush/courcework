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

  delete(req, res){
    return FavoritesPlayer
      .findOne({
        where: {
          userID: req.user.id,
          playerID: req.params.id,
        }
      })
      .then(favoritesPlayer => {
        if (!favoritesPlayer) {
          return res.status(400).send({
            message: 'Player Not Found',
          });
        }
        return favoritesPlayer
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
