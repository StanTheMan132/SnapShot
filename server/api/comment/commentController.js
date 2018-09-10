const Comment = require('./commentModel');
const User = require('../auth/userModel');
const commentFunctions = require('./commentFunctions');

exports.createNewComment = async function createNewComment(req, res, next) {
  try {
    if (!req.body.commentContent) {
      res.status(400).json({ msg: 'No comment found' });
    }
    const result = await commentFunctions.addNewComment(req.body.commentContent, req.body.commentParentId, req.body.parentPostId, req.user.id, User, Comment);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.editComments = async function editComments(req, res, next) {
  try {
    if (!req.body.commentId || !req.body.commentContent) {
      res.status(400).json({ msg: 'No new content/comment found' });
    }
    const result = await commentFunctions.editComment(req.body.commentId, req.body.commentContent, Comment);
    res.status(204).json(result);
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
    const status = await commentFunctions.getComments(postId, Comment);
    res.status(201).json(status);
  } catch (err) {
    next(err);
  }
};
