'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class snippet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      snippet.belongsToMany(models.tag,{
        through: 'snippetTag',
        foreignKey:'snippetId'
      })
    }
  };
  snippet.init({
    snippet: DataTypes.TEXT,
    title: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'snippet',
  });
  return snippet;
};