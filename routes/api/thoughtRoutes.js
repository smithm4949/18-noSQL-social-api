const router = require('express').Router();
const { 
  getAll,
  getOne,
  create,
  update,
  deleteThought
} = require('../../controllers/thoughtController');

router.route('/').get(getAll).post(create);

router.route('/:id').get(getOne).put(update).delete(deleteThought);

module.exports = router;