const { User, Thought } = require('../models');

module.exports = {
  getAll(req, res) {
    User.find()
      .then(users => {
        return res.json(users);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  getOne(req, res) {
    User.findById(req.params.id)
      .then(user => {
        user ? res.json(user) : res.status(404).json({message: 'user not found'})
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  create(req, res) {
    User.create(req.body)
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findByIdAndDelete(req.params.id)
      .then(user => {
        user ? res.json(user) : res.status(404).json({message: 'user not found'})
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  update(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body)
      .then(user => {
        user ? res.json(user) : res.status(404).json({message: 'user not found'})
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err);
      });
  }
}