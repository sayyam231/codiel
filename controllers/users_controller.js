module.exports.users = function (req, res) {
    res.end("users page")
}
module.exports.profile = function (req, res) {
    res.end("Profile page")
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
    // todo

}
// sign in and create the session for the user
module.exports.createSession = (req, res)=>{
    // todo

}