const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');


router.use('/', homeRoutes); //localhost:3001/
router.use('/api', apiRoutes); //localhost:3001/api

module.exports = router;
