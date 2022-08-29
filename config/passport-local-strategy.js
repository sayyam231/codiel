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
module.exports = passport;