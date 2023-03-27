const router = require('express').Router();
const { 
  getAll,
  getOne,
  create,
  update,
  deleteUser
} = require('../../controllers/userController');

router.route('/').get(getAll).post(create);

router.route('/:id').get(getOne).put(update).delete(deleteUser);

module.exports = router;