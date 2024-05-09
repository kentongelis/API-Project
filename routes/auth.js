const { login,
        signup,
        logout}
        = require('../controllers/auth')
const express = require('express');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/logout', logout);

module.exports = router;