'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NcfType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  NcfType.init({
    name: DataTypes.STRING,
    prefix:DataTypes.STRING,
    description:DataTypes.STRING

  }, {
    sequelize,
    modelName: 'NcfType',
    timestamps:false
  });
  return NcfType;
};