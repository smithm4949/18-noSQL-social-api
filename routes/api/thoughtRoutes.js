const router = require('express').Router();
const { 
  getAll,
  getOne,
  create,
  update,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getAll).post(create);

router.route('/:id').get(getOne).put(update).delete(deleteThought);

router.route('/:id/reactions').post(addReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;