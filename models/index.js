const User = require('./User');
const Saved = require('./SavedCountry');

User.hasMany(Saved, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Saved.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Saved };
