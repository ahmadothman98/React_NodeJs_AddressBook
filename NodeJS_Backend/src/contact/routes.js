const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const { add, get} = require('./controller');



router.post('/add_contact', add);
router.get('/get_contacts:id', get);

module.exports = router;