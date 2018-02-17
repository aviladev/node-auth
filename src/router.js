const router = require('express').Router()

router.route('/')
  .get((req, res) => {
    res.send('Root')
  })

module.exports = router
