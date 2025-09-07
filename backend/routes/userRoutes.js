const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controller/userController');
const router = express.Router();

//register user
router.post('/register', registerUser);

//login user
router.post('/login', loginUser);

//get user profile
router.get('/profile', getUserProfile);



module.exports = router;