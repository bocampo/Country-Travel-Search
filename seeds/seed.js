const sequelize = require('../config/connection');
const { User, SavedCountry, Visa } = require('../models');

const userData = require('./userData.json');
const savedData = require('./savedData.json');
const visaData = require('./visaData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });


  for (const saved of savedData) {
    await SavedCountry.create({
      ...saved,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
