const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define("tipo", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    }, { timestamps: false }
  );
};