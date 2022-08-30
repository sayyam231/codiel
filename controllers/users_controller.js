const User = require('../models/user');
module.exports.users = function (req, res) {
    res.end("users page")
}
module.exports.profile = function (req, res) {
    return res.render("profile", {
        title: "profile"
    });
}
// render the sign in page
module.exports.signIn = (req, res) => {
    res.render('sign_in', {
        title: "sign in"
    });
}
// render the sign up page
module.exports.signUp = (req, res) => {
    res.render('sign_up', {
        title: "sign up"
    });
};

// get the sign up data 
module.exports.create = function (req, res) {
    const data = req.body
    if (data.confirm_password != data.password) {
        
        return res.redirect('back');
    }
    User.findOne({ email: data.email }, (err, user)=>{
        if (err) {
            console.log("Cannot find the email in DB:");
            return;
        }
        if (!user) {
            User.create(data, (err, user) => {
                if (err) {
                    console.log("error in creating the user");
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else {
            return res.redirect('back');
        }
    })
}
// sign in and create the session for the user
module.exports.createSession = (req, res)=>{
    return res.redirect('/users/profile');

}
// sign out
module.exports.destroySession = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return res.redirect('back');
        }

        return res.redirect('/');
    });
}