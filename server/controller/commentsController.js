const CommentsPlayers = require('../models').commentsPlayers;

module.exports = {
  create(req, res){
    return CommentsPlayers
      .create({
        comment: req.params.comment,
        userID: req.user.id,
        playerID: req.params.playerId
      })
      .then((team) => res.status(201).send(team))
      .catch((error) => res.status(400).send(error));
  },
};
