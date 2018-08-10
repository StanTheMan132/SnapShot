const express = require('express');
const authRoutes = require('./auth/authRouter');
const postRoutes = require('./models/post/postRouter');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/post', postRoutes);

module.exports = router;
