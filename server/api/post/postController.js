const Post = require('./postModel');
const User = require('../auth/userModel');
const postFunctions = require('./postFunctions');
const commentController = require('../comment/commentController');

exports.createNewPost = async function createNewPost(req, res, next) {
  try {
    if (!req.body.imgUrl) {
      res.status(400).json({ msg: 'No img found, please add a img' });
    }
    const newPost = await postFunctions.newPost(req.body.imgUrl, req.user.id, Post);
    if (newPost.succes) {
      res.status(201).json(newPost);
    } else {
      res.status(500).json(newPost);
    }
  } catch (error) {
    next(error);
  }
};

exports.getLatestPost = async function getLatestPost(req, res, next) {
  try {
    const { lastPostDate } = req.query;
    const posts = await postFunctions.latestPost(lastPostDate, Post);
    res.status(200).send(posts);
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async function deletePost(req, res, next) {
  try {
    if (!req.body.postId) {
      res.status(400).json({ msg: 'No post found' });
    }
    const post = await Post.findOne({ _id: req.body.postId });
    const user = await User.findOne({ username: post.username });
    if (user._id != req.user.id) {
      res.status(401).json({ msg: 'Unauthorized' });
    } else {
      const done = await postFunctions.deletePostandComments(req.body.postId, Post, commentController);
      res.send(done);
    }
  } catch (err) {
    next(err);
  }
};
