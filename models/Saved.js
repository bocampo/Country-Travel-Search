const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Saved extends Model {}

Saved.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    population: {
      type: DataTypes.FLOAT,
    },
      languages: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model:'user',
          key: 'id'
        }
      }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'project',
  }
);

module.exports = Saved;
