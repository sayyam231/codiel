const Comment = require('../models/comments');
const Post = require('../models/post');
module.exports.create = async (req, res) => {
    try {
        let post = await Post.findById(req.body.post);

        let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        });

        post.comment.push(comment);
        post.save();

        return res.redirect('back');
    } catch (err) {
        console.log("ERROR", err);
        return;
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(postId, { $pull: { comment: req.params.id } });
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }

    } catch (err) {
        console.log("Error", err);
        return;
    }
    
   
}