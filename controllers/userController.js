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
  }
}