const express = require('express');
const { getSettings, updateSetting, createSettings, getDynamicSettings, getDynamicFormOneSettings } = require('../controller/masterSettingsController');

const router = express.Router();

router.get('/', getSettings);
router.put('/', updateSetting);
router.post('/save-form', createSettings);
router.get('/get-save-form', getDynamicSettings);
router.get('/get-save-from-one', getDynamicFormOneSettings);

module.exports = router;
