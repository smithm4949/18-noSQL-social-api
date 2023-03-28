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
        if (user) {
          Thought.deleteMany({ _id: { $in: user.thoughts } })
          .then(() => console.log('delete many fired'));
          res.json(user);
        } else {
          res.status(404).json({message: 'user not found'})
        }
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  update(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(user => {
        user ? res.json(user) : res.status(404).json({message: 'user not found'})
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then(user => {
        user ? res.json(user) : res.status(404).json({message: 'user not found'})
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then(user => {
        user ? res.json(user) : res.status(404).json({message: 'user not found'})
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err);
      });
  }
}