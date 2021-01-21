"use strict";
const { Model } = require("sequelize");
const clients = require("./clients");
module.exports = (sequelize, DataTypes) => {
  class Quotation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Quotation.belongsTo(models.Clients);
    }
  }
  Quotation.init(
    {
      Number: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Quotation",
    }
  );
  return Quotation;
};
