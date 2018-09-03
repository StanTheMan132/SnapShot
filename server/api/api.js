/*
  This is the router for the /api route
  All rotues should go through here.
*/

const express = require('express');
const authRoutes = require('./auth/authRouter');
const postRoutes = require('./post/postRouter');
const commentRoutes = require('./comment/commentRouter');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
