const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');


router.post('/signup', authController.postSignup);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

router.get('/products/:productId', authController.getProduct);

module.exports = router;