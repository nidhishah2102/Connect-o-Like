const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const router = express.Router();
const userController = require('../controllers/auth.controller'); 

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/register', userController.registerUser);
router.post('/login',userController.loginUser)



router.post('/upload-logo', upload.single('logo'), userController.uploadLogo);


module.exports = router;
