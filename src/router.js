const router = require('express').Router()

const { signup } = require('./controllers/authentication')

router.route('/signup')
  .post(signup)

module.exports = router
