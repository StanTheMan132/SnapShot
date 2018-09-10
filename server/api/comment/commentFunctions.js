/**
 * This function will add a new comment to the database
 * @param {String} commentContent - Text content of the comment
 * @param {Id} parentCommentId - Id of the comment it is commenting on, only required when its a nested comment
 * @param {Id} parentPostId - Id of the post the comment is commenting on
 * @param {Id} userId - Id of the user posting the comment
 * @param {Model} User - Either the User model or a mock for testing
 * @param {Model} Comment - Either the Post Comment or a mock for testing
 */
exports.addNewComment = async function addNewComment(commentContent, parentCommentId, parentPostId, userId, User, Comment) {
  try {
    const newDate = new Date();
    //  find a user with the id that the auth middelware stores in req.user
    const user = await User.findOne({ _id: userId });
    // Create a new comment
    const newComment = new Comment({
      username: user.username,
      date: newDate,
      commentContent,
      parentCommentId,
      parentPostId,
    });
    // save the comment
    await newComment.save();
    return newComment;
  } catch (err) {
    return err;
  }
};

exports.editComment = async function editComment(commentId, commentContent, Comment) {
  const comment = await Comment.findOne({ _id: commentId });
  comment.set({ commentContent });
  comment.save();
};

exports.getComments = async function getComments(postId, Comment) {
  const comments = await Comment.find({ parentPostId: postId });
  if (!comments) {
    return { msg: 'no comments found' };
  }
  return comments;
};

exports.deleteComments = async function deleteComments(postId) {
  try {
    await Comment.remove({ parentPostId: postId });
    return true;
  } catch (err) {
    return false;
  }
};
