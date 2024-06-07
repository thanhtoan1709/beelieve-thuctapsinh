"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsTo(models.Sub_category, {
        foreignKey: "code_cat",
        targetKey: "codevalue_cat",
        as: "category&sub_cate_Data",
      });
    }
  }
  Category.init(
    {
      id_pr: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.STRING,
      },
      code_Cate: DataTypes.STRING,
      valueCate: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
