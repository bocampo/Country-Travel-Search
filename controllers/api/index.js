const router = require('express').Router();
const userRoutes = require('./userRoutes');
const savedRoutes = require('./savedRoutes');

router.use('/users', userRoutes); //locahost:3001/api/users/
router.use('/saved', savedRoutes);

module.exports = router;
