const jwt = require('jsonwebtoken')

const { secret } = require('../../config')
const User = require('../models/user')

const createToken = (user) => jwt.sign(
  { sub: user.id, iat: Date.now() },
  secret
)

const signup = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(409).json({
        error: true,
        reason: 'Email already in use'
      })
    }
  } catch (e) {
    return res.status(500).json({
      error: true,
      reason: 'Could not check email'
    })
  }

  try {
    const user = new User({ email, password })
    await user.save()

    res.status(201).json({ token: createToken(user) })
  } catch ({errors}) {
    if (errors) {
      return res.status(400).json({ error: true, ...errors })
    } else {
      return res.status(500).json({
        error: true,
        reason: 'Could not save user'
      })
    }
  }
}

const signin = async ({user}, res, next) =>
  res.send({ token: createToken(user) })

module.exports = {
  signup,
  signin
}
