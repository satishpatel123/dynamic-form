const express = require('express');
const { getSettings, updateSetting } = require('../controller/masterSettingsController');

const router = express.Router();

router.get('/', getSettings);
router.put('/', updateSetting);

module.exports = router;
