const Post = require('./postModel');
const User = require('../../auth/userModel');
const Comment = require('../comment/commentModel');
const commentController = require('../comment/commentController');

exports.createNewPost = async function createNewPost(req, res, next) {
  try {
    if (!req.body.imgUrl) {
      res.status(400).json({ msg: 'No img found, please add a img' });
    }
    const newDate = new Date();
    const user = await User.findOne({ _id: req.user.id });
    const newPost = new Post({
      username: user.username,
      imgUrl: req.body.imgUrl,
      date: newDate,
    });
    newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

exports.getLatestPost = async function getLatestPost(req, res, next) {
  try {
    let latestPost = [];
    const { lastPostDate } = req.query;
    if (lastPostDate) {
      latestPost = await Post.find({ date: { $lt: lastPostDate } }).sort('-date').limit(11);
    } else {
      latestPost = await Post.find().sort('-date').limit(11);
    }
    res.status(200).send(latestPost);
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
    console.log(`${user._id} is = to ${req.user.id}`);
    if (user._id != req.user.id) {
      res.status(401).json({ msg: 'Unauthorized' });
    } else {
      await commentController.deleteComments(req.body.postId);
      await Post.findOneAndRemove({ _id: req.body.postId });
      res.status(204).send();
    }
  } catch (err) {
    next(err);
  }
};
