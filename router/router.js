const express = require('express');
const userRouter = require('./user'); 
const masterSettingRouter = require('./master-setting'); 
const router = express.Router()

router.use('/users', userRouter);
router.use('/master-settings', masterSettingRouter);



module.exports = router;