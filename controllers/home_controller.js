const { populate } = require('../models/comments');
const Post = require('../models/post');

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
        if (err) {
            console.log("err in finding post");
        }
        return res.render('home', {
            title: "Home",
            posts: posts
        });
    });
        
    
   
    
};