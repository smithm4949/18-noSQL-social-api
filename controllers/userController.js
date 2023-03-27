const { User, Thought } = require('../models');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then(users => {
        return res.json(users);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  getUser(req, res) {
    User.findById(req.params.id)
      .then(user => {
        user ? res.json(user) : res.status(404).json({message: 'user not found'})
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err);
      });
  }
}