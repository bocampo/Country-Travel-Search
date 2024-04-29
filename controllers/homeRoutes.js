const router = require('express').Router();
const { Saved, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Saved.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const countries = projectData.map((countries) => countries.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      countries, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/saved/:id', async (req, res) => {
  try {
    const projectData = await Saved.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const countries = projectData.get({ plain: true });

    res.render('countries', {
      ...countries,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Saved }],
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

//Remote API call example
router.get('/list', (req, res) => {
  fetch('https://restcountries.com/v3.1/name/us')
  .then(function(response){
    return response.json();
  }).then(function(jokes){

    //Do whatever you want with the data. Save it to the database etc
    //in this case I'm just sending it back to the user
    //but all things are triggered by the routes
    console.log(jokes);
    res.send(jokes.value);
  })
});

module.exports = router;
