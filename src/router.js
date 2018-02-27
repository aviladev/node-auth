const router = require('express').Router()
const passport = require('passport')

const { signup, signin } = require('./controllers/authentication')
require('./services/passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

router.route('/')
  .get(requireAuth, (req, res) =>
    res.send({ message: 'Node Auth API' })
  )

router.route('/signup')
  .post(signup)

router.route('/signin')
  .post(requireSignin, signin)

module.exports = router
