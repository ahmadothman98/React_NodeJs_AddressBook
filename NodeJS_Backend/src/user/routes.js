const {Router} =require('express');
const { register, login, get} = require('./controller')

const router = Router;


router.post('/signup',register);
router.post('/login',login);
router.get('/profile', get);

module.exports = router;