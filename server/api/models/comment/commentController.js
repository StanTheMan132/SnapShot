const Comment = require('./commentModel');
const User = require('../../auth/userModel');

exports.createNewComment = async function createNewComment(req, res, next) {
  try {
    if (!req.body.commentContent) {
      res.status(400).json({ msg: 'No comment found' });
    }
    const newDate = new Date();
    //  find a user with the id that the auth middelware stores in req.user
    const user = await User.findOne({ _id: req.user.id });
    const newComment = new Comment({
      username: user.username,
      date: newDate,
      // comment text/content
      commentContent: req.body.commentContent,
      // Id of the parent comment, only used in nested comments
      parentCommentId: req.body.parentCommentId,
      // Id of the parent post
      parentPostId: req.body.parentPostId,
    });
    newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    next(err);
  }
};

exports.editComments = async function editComments(req, res, next) {
  try {
    if (!req.body.commentId || !req.body.newCommentContent) {
      res.status(400).json({ msg: 'No new content/comment found' });
    }
    const comment = await Comment.findOne({ _id: req.body.commentId });
    console.log(comment);
    comment.set({ commentContent: req.body.newCommentContent });
    comment.save();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.getComments = async function getComments(req, res, next) {
  try {
    if (!req.query.postId) {
      res.status(400).json({ msg: 'No postId found' });
    }
    const { postId } = req.query;
    const comments = await Comment.find({ parentPostId: postId });
    if (!comments) {
      res.status(400).json({ msg: 'no comments found' });
    }
    res.status(201).json(comments);
  } catch (err) {
    next(err);
  }
};
