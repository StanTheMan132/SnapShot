/**
 * This function finds a post by its postId and deletes the post as well as calling the deleteComments function.
 * @param {string} postId - Mongo Id of the post to be deleted
 * @param {Object} Post - Either the Post model or a mock for testing
 * @param {Object} commentController - The commentController with functions for the comments
 */
exports.deletePostandComments = async function deletePostandComments(postId, userId, Post, commentFunctions, User) {
  try {
    const post = await Post.findOne({ postId });
    const user = await User.findOne({ username: post.username });
    if (user._id != userId) {
      return { success: false, msg: 'Unauthorized' };
    }
    const deleteComments = await commentFunctions.deleteComments(postId);
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

/**
 * This function will return the last 10 post, if a lastPostDate is passed in it will get the last 10 post before that date.
 * @param {Date} lastPostDate - Mainly to be used to get more posts for the feed, pass in the date of the last image on the current feed.
 * @param {Object} Post - Either the post model or a mock for testing
 */
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

/**
 * Creates a new post
 * @param {Id} imgUrl - the Url(might change later to database id) of the new image
 * @param {Id} userId - the Id of the user, the auth middelware inserts this into req.user.id
 * @param {Object} Post - Either the post model or a mock for testing
 */
exports.newPost = async function newComment(imgUrl, userId, Post, User) {
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
