const router = require('express').Router();
const { SavedCountry } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newSaved = await SavedCountry.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newSaved);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const savedData = await SavedCountry.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!savedData) {
      res.status(404).json({ message: 'No country found with this id!' });
      return;
    }

    res.status(200).json(savedData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
