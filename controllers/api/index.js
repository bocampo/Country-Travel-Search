const router = require('express').Router();
const userRoutes = require('./userRoutes');
const savedRoutes = require('./savedRoutes');

router.use('/users', userRoutes);
router.use('/saved', savedRoutes);

module.exports = router;
