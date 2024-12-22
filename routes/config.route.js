const ConfigController = require('../controllers/config.controller');
const express = require('express');
const router = express.Router();


// Create a new config
router.post('/config', ConfigController.createConfig);
router.get('/config', ConfigController.findAll);
router.put('/config/:id', ConfigController.update);


module.exports = router;