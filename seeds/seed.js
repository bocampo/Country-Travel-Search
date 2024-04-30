const sequelize = require('../config/connection');
const { User, Saved } = require('../models');

const userData = require('./userData.json');
const savedData = require('./projectData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const saved of savedData) {
    await Saved.create({
      ...saved,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();

/*
"id": ,
"name": ,
"country_code": ,
"region": ,
"population": ,
"languages":
*/