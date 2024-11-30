const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { getAllUsersController, getAllFitnessConsultantController, changeAccountStatusController,deleteFitnessConsultantController } = require('../controllers/adminCtrl');

// Router object
const router = express.Router();

// get methods || users

router.get('/getAllUsers',authMiddleware,getAllUsersController);

// get methods || fitness consultants

router.get('/getAllFitnessConsultants',authMiddleware,getAllFitnessConsultantController);

// POST Account Status

router.post('/changeAccountStatus',authMiddleware,changeAccountStatusController);


//POST delete fitness consultant

router.post('/deleteFitnessConsultant', authMiddleware, deleteFitnessConsultantController);


module.exports = router;
