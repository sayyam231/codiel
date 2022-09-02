const Comment = require('../models/comments');
const Post = require('../models/post');
module.exports.create = (req, res) => {
    console.log(req.body);
    Post.findById(req.body.post, (err, post) => {
        if (post) {
            
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function (err, comment) {
                if (err) {
                    console.log("Error in creating the comment");
                    return;
                }
                // updating the post db and saving it
                if (!Array.isArray(post.comment)) {
                    post.comment = [];
                }
                post.comment.push(comment);
                post.save();

                return res.redirect('back');

            });
        }
        
    });
}