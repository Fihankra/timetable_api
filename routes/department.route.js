const DepartmentController = require('../controllers/department.controller');
const express = require('express');
const router = express.Router();


router.get('/departments', DepartmentController.findAll);
router.post('/department', DepartmentController.create);
//update a department
router.put('/department/:id', DepartmentController.update);
//delete a department
router.delete('/department', DepartmentController.delete);

module.exports = router;

