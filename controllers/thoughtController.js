const { User, Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
  getAll(req, res) {
    Thought.find()
      .then(thoughts => {
        return res.json(thoughts);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  getOne(req, res) {
    Thought.findById(req.params.id)
      .then(thought => {
        thought ? res.json(thought) : res.status(404).json({message: 'thought not found'})
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  create(req, res) {
    Thought.create(req.body)
      .then(thought => {
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: {thoughts: ObjectId(thought.id)} }
        )
          .then(user => console.log(user))
          .catch(err => console.log(err))
        res.json(thought);
      })
      .catch(err => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.id)
      .then(thought => {
        thought ? res.json(thought) : res.status(404).json({message: 'thought not found'})
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  update(req, res) {
    Thought.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(thought => {
        thought ? res.json(thought) : res.status(404).json({message: 'thought not found'})
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
    .then(thought => {
      thought ? res.json(thought) : res.status(404).json({message: 'thought not found'})
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json(err);
    });
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId} } },
      { runValidators: true, new: true }
    )
    .then(thought => {
      thought ? res.json(thought) : res.status(404).json({message: 'thought not found'})
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json(err);
    });
  }
}