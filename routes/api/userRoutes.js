const router = require('express').Router();
const { 
  getAll,
  getOne,
  create,
  update,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

router.route('/').get(getAll).post(create);

router.route('/:id').get(getOne).put(update).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;