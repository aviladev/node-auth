const User = require('../models/user')

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

  res.status(201).json({ success: true })
}

module.exports = {
  signup
}
