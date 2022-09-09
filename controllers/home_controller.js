const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = function (req, res) {
    
    // populate the user to show the name too
    Post.find({})
        .populate('user')
        .populate({
            path: 'comment',
            populate: {
                path: 'user'
            }
        })
        .exec(function (err, posts) {
            User.find({}, (err, user)=> {
                return res.render('home', {
                    title: "Home",
                    posts: posts,
                    all_users:user
                });
         })
        
    });
        
    
   
    
};