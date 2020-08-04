'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class snippetTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      snippetTag.belongsTo(models.tag),
      snippetTag.belongsTo(models.snippet)
    }
  };
  snippetTag.init({
    tagId: DataTypes.INTEGER,
    snippetId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'snippetTag',
  });
  return snippetTag;
};