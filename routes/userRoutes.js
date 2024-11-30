const express = require('express');
const {
    loginController,
    registerController,
    authController,
    applyFitnessConsultant,
    getAllNotificationController,
    deleteAllNotificationController,
    getAllFitnessConsultantsController,
    bookAppointmentController,
    bookAvailabilityController,
    userAppointmentsController,
} = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

// Router object
const router = express.Router();

// Routes

// LOGIN || POST
router.post('/login', loginController);

// REGISTER || POST
router.post('/register', registerController);

// Auth || POST
router.post('/getUserData', authMiddleware, authController);

// Apply Fitness Consultant || POST
router.post('/apply-fitness-consultant', authMiddleware, applyFitnessConsultant);

// Notification Fitness Consultant || POST
router.post('/get-all-notification', authMiddleware, getAllNotificationController);

// Notification Fitness Consultant || POST
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController);

// Get all fitness consultants
router.get('/getAllFitnessConsultants', authMiddleware, getAllFitnessConsultantsController);


//BOOK APPOINTMENT
router.post('/book-appointment', authMiddleware, bookAppointmentController);

//Booking Avilability
router.post('/book-availability', authMiddleware, bookAvailabilityController);

//Appointment list
router.get('/user-appointments', authMiddleware, userAppointmentsController);

module.exports = router;
