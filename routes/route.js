const express = require('express');
const router = express.Router();

const { tests } = require('../controllers/test');
router.post('/test', tests);
// router.patch('/del', send);
// router.post('/getd',getdata);
// router.patch('/change',change)
module.exports = router; 