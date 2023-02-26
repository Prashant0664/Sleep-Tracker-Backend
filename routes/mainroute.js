const express = require('express');
const router = express.Router();

const { test, send, getdata, change } = require('../controllers/main');
router.post('/main', test);
router.patch('/del', send);
router.post('/getd',getdata);
router.patch('/change',change)
module.exports = router;