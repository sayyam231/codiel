const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');
router.get('/', usersController.users)
// adding the middleware created in the passport-local-strategy
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
// added middleware if signed in then redirect to profile page
router.get('/sign-in',passport.checkLoggedIn,  usersController.signIn);
router.get('/sign-up', passport.checkLoggedIn, usersController.signUp);
router.post('/create', usersController.create);
// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',{failureRedirect: '/users/sign-in'}
), usersController.createSession);
router.get('/sign-out', usersController.destroySession);
router.post('/update/:id', passport.checkAuthentication, usersController.update);
module.exports = router;