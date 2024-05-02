const router = require('express').Router();
const { SavedCountry, User } = require('../models');
const { count } = require('../models/User');
const withAuth = require('../utils/auth');



router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const savedData = await SavedCountry.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const countries = savedData.map((countries) => countries.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('home', {
      countries,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/saved', async (req, res) => {
  
  try {
    // const savedData = await SavedCountry.findByPk(req.params.id, {
      
      const savedData = await SavedCountry.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    console.log(savedData);

    const countries= savedData.map((country) => country.get({plain: true}));

    console.log(countries);

    res.render('saved', {
      countries,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    // Handle the error appropriately
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching saved data' });
  }
});



// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: SavedCountry }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {

  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');

});

module.exports = router;
