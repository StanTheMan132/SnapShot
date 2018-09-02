const commentController = require('../comment/commentController');
const Post = require('./postModel');

exports.deletePostandComments = async function deletePostandComments(postId) {
  try {
    console.log(postId);
    await Post.findOneAndRemove({ _id: postId });
    await commentController.deleteComments(postId);
    return true;
  } catch (err) {
    return err;
  }
};
