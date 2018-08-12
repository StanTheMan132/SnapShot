const express = require('express');
const authRoutes = require('./auth/authRouter');
const postRoutes = require('./models/post/postRouter');
const commentRoutes = require('./models/comment/commentRouter');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
