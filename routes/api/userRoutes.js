const router = require('express').Router();

router.route('/').get((req, res) => {
  res.status(200).json({data: 'Route working in userRoutes!'})
})

module.exports = router;