const express = require('express');
const router = express.Router();
const {updateSettings} = require('../controllers/settingsController');

router.get('/update/', updateSettings);
module.exports = router;