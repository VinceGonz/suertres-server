const router = require('express').Router()
module.exports = router

router.use('/bets', require('./bets_r'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})  