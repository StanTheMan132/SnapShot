const Post = require('./postModel');
const User = require('../../auth/userModel');
const postFunctions = require('./postFunctions');

exports.createNewPost = async function createNewPost(req, res, next) {
  try {
    if (!req.body.imgUrl) {
      res.status(400).json({ msg: 'No img found, please add a img' });
    }
    const newDate = new Date();
    console.log(req.user.id);
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
    if (user._id != req.user.id) {
      res.status(401).json({ msg: 'Unauthorized' });
    } else {
      const done = await postFunctions.deletePostandComments(req.body.postId);
      res.send(done);
      
      
    }
  } catch (err) {
    next(err);
  }
};
