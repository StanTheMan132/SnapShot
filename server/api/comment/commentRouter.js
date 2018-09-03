const express = require('express');
const comment = require('./commentController');
const verifyToken = require('../../middleware/authMiddelware/verifyToken');

const commentRoutes = express.Router();

// routes
commentRoutes.use(verifyToken());

commentRoutes.route('/newcomment')
  .post(comment.createNewComment);

commentRoutes.route('/getcomments')
  .get(comment.getComments);

commentRoutes.route('/editcomment')
  .post(comment.editComments);


module.exports = commentRoutes;
