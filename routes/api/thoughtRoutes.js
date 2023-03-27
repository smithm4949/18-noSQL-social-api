const router = require('express').Router();

router.route('/').get((req, res) => {
  res.status(200).json({data: 'Route working in thoughtRoutes!'})
})

module.exports = router;