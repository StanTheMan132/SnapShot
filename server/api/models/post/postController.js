const Post = require('./postModel');
const User = require('../../auth/userModel');

exports.createNewPost = async function createNewPost(req, res) {
  try {
    const newDate = new Date();
    const user = await User.findOne({ _id: req.user.id });
    const newPost = new Post({
      username: user.username,
      imgUrl: req.body.imgUrl,
      date: newDate,
    });
    newPost.save();
    res.status(204).send();
  } catch (err) {
    res.status(500).send({ msg: err });
  }
};

exports.getLatestPost = async function getLatestPost(req, res) {
  try {
    let latestPost = [];
    const { lastPostDate } = req.query;
    if (lastPostDate) {
      latestPost = await Post.find({ date: { $lt: lastPostDate } }).sort('-date').limit(11);
    } else {
      latestPost = await Post.find().sort('-date').limit(11);
    }
    res.status(200).send({ posts: latestPost });
  } catch (err) {
    res.status(500).send({ msg: err });
  }
};
