const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const { add, get, update, filter} = require('./controller');



router.post('/add_contact', add);
router.get('/get_contacts:id', get);
router.put('/edit_contact',update);
router.get('/filter:keyword',filter);

module.exports = router;