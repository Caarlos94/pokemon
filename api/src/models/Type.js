const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define("type", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    }, { timestamps: false }
  );
};