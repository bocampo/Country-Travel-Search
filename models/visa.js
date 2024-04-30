const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Visa extends Model { }

Visa.init(
    {
        id: {
            type: DataTypes.SERIAL,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        country_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        visa_requirement: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    /*
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'project',
    }*/
)