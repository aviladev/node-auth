const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local')

const { secret } = require('../../config')
const User = require('../models/user')

const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  try {
    const user = await User.findOne({email})

    if (!user) return done(null, false)

    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err)
      if (!isMatch) return done(null, false)

      done(null, user)
    })
  } catch (e) {
    done(e)
  }
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret
}

const jwtLogin = new JwtStrategy(jwtOptions, async ({ sub: id }, done) => {
  try {
    const user = await User.findById(id)

    if (user) done(null, user)
    else done(null, false)
  } catch (e) {
    done(e, false)
  }
})

passport.use(jwtLogin)
passport.use(localLogin)
