const User = require('../models/user')

const signup = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(422).json({ error: 'Email already in use' })
    }

    const user = new User({ email, password })

    await user.save()

    res.json({ success: true })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  signup
}
