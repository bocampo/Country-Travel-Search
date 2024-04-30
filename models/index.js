const User = require('./User');
const SavedCountry = require('./SavedCountry');

User.hasMany(SavedCountry, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

SavedCountry.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, SavedCountry };
