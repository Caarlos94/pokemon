const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    idBusqueda: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    life: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 500 },
    },
    attack: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 750 },
    },
    defense: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 750 },
    },
    speed: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 500 },
    },
    height: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 50 },
    },
    weight: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 1000 },
    },
    img: {
      type: DataTypes.STRING
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, { timestamps: false } );
};
