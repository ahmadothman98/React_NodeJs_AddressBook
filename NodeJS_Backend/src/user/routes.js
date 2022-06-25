const express = require('express');
const router = express.Router();
const { register, login} = require('./controller')


router.post('/signup',register);
router.post('/login',login);
//router.get('/profile', get);

module.exports = router;