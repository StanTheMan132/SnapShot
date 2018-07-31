const router = require({"express").Router();
const authRoutes = require("./auth/authRouter");

router.use('/auth', authRoutes);

module.exports = router;