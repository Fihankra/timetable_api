const PublishController = require('../controllers/publish.controller');

const express = require('express');

const router = express.Router();

router.get('/messages', PublishController.findAllMessages);
router.get('/tables', PublishController.findAllTables);

module.exports = router;