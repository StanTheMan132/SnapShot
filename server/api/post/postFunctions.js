const User = require('../auth/userModel');

exports.deletePostandComments = async function deletePostandComments(postId, Post, commentController) {
  try {
    const deleteComments = await commentController.deleteComments(postId);
    const deletePost = await Post.findOneAndRemove({ _id: postId });
    if (deleteComments && deletePost) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return err;
  }
};

exports.latestPost = async function latestPost(lastPostDate, Post) {
  try {
    let posts = [];
    if (lastPostDate) {
      posts = await Post.find({ date: { $lt: lastPostDate } }).sort('-date').limit(11);
    } else {
      posts = await Post.find().sort('-date').limit(11);
    }
    return posts;
  } catch (err) {
    console.log(err);
    return err;
  }
};

exports.newPost = async function newComment(imgUrl, userId, Post) {
  try {
    const user = await User.findOne({ _id: userId });
    if (user) {
      const date = new Date();
      const newPost = new Post({
        username: user.username,
        imgUrl,
        date,
      });
      await newPost.save();
      return { success: true, newPost };
    }
    return { success: false, msg: 'User not found' };
  } catch (err) {
    console.log(err);
    return err;
  }
};
