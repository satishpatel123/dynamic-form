const express = require('express');
const { getAllUsers, createUser, getMasterSettings } = require('../controller/userController');
const router = express.Router()

router.get('/get-all', getAllUsers);

router.post('/create/user', createUser)

module.exports = router;