const ProgramController = require('../controllers/program.controller');
const express = require('express');
const router = express.Router();


router.get('/programs', ProgramController.findAll);
router.post('/program', ProgramController.create);
//update a program
router.put('/program/:id', ProgramController.update);
//delete a programs
router.delete('/program', ProgramController.delete);

module.exports = router;