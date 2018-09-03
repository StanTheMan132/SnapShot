
exports.deletePostandComments = async function deletePostandComments(postId, Post, commentController) {
  try {
    const deleteComments = await commentController.deleteComments(postId);
    const deletePost = await Post.findOneAndRemove({ _id: postId });
    if (deleteComments && deletePost) {
      return true;
    }
    return false;
  } catch (err) {
    return err;
  }
};
