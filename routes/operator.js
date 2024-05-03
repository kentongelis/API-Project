const express = require('express')

// import all your controllers
require('../controllers/operators')

// import any middleware

// create routes
const router = express.Router()

router.get('/operator', showOperators)
router.post('/operators/:search', showOneOperator)

export default router 