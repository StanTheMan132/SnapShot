const express = require('express');
const post = require('./postController');
const verifyToken = require('../../middleware/authMiddelware/verifyToken');

const postRoutes = express.Router();

// use the authentication middelware on all routes
postRoutes.use(verifyToken());

// routes

postRoutes.route('/newpost')
  .post(post.createNewPost);

postRoutes.route('/getpost')
  .get(post.getLatestPost);

postRoutes.route('/deletepost')
  .delete(post.deletePost);

module.exports = postRoutes;
