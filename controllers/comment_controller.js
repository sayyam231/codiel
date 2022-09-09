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

module.exports.destroy = function (req, res) {
    Comment.findById(req.params.id, (err, comment) => {
        if (comment.user == req.user.id) {
            // BRUTE FORCE WAY OF DELETING
            // Post.findById(comment.post, (err, post) => {
            //     if (post) {
            //         comment.remove();
            //         for (let i = 0; i < post.comment.length; i++) {
            //             if (post.comment[i] == req.params.id) {
            //                 post.comment.splice(i, 1);
            //            }
            //         }
            //         return res.redirect('back');
            //    } 
            // });
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId, { $pull: { comment: req.params.id } }, function (err, post) {
                return res.redirect('back');
            });
            
        } else {
            return res.redirect('back');
        }
    });
}