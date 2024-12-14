const ClassController = require('../controllers/class.controller');
const express = require('express');
const router = express.Router();

// Create a new Class
router.post('/class', ClassController.create);
router.get('/class', ClassController.findAll);
router.put('/class/:id', ClassController.update);
router.delete('/class', ClassController.delete);

module.exports = router;