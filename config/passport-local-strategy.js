const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy(
    // find a user and establish an identity
    function (email, password, done) {
    User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (user.password != password) { return done(null, false); }
        return done(null, user);
    });
}
));

// serialize user function to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});


// deserialize user function
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log("Error in findint the user  --> passport");
            return;
        }
        done(null, user);
    });
});


// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    // if the user is signed in then pass on to the controller
    if (req.isAuthenticated()) {
        return next();
    }
    // if user is not signed in
    return res.redirect('/users/sign-in');
}
// if the user is already signed in
passport.checkLoggedIn = (req, res, next) =>{
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return next();
}

passport.setAuthenticatedUser = function (req, res, next) {
    // transferring the user data to locals for retrieving data 
    if (req.isAuthenticated()) {
        // req.user contains signed in user from the session cookie
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;