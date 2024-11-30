const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getFitnessConsultantInfoController, updateProfileController, getFitnessConsultantByIdController, fitnessConsultantAppointmentsController } = require('../controllers/fitnessConsultantCtrl');
const router = express.Router();

//POST single fc info

router.post('/getFitnessConsultantInfo', authMiddleware, getFitnessConsultantInfoController);

// POST update profile

router.post('/updateProfile',authMiddleware,updateProfileController);

//POST get single fitness consultnat

router.post('/getFitnessConsultantById',authMiddleware,getFitnessConsultantByIdController)


//GET Appointment
router.get('/fitness-consultant-appointment',authMiddleware,fitnessConsultantAppointmentsController)


module.exports = router;
