const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
router.get('/', homeController.home);
router.use('/users', require('./user'));
router.use('/post', require('./post'));
router.use('/comments', require('./comments'));
module.exports = router;