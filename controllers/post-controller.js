const Post = require('../models/post');
const Comment = require('../models/comments');
module.exports.create = async (req, res) => {
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        return res.redirect('back');
    } catch (error) {
        console.log("Error", error);
        return;
    }
}    

module.exports.destroy =async function (req, res) {
    
    try {
        let post = await Post.findById(req.params.id);

        // .id means converting the object id to string
        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id });
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log("Error", err);
        return;
    }

}
