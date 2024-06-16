"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Outfit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Outfit.belongsTo(models.Products, {
        as: "TopProduct",
        foreignKey: "topProductId",
      });

      Outfit.belongsTo(models.Products, {
        as: "BottomProduct",
        foreignKey: "bottomProductId",
      });
    }
  }
  Outfit.init(
    {
      outfitName: DataTypes.STRING,
      topProductId: DataTypes.STRING,
      bottomProductId: DataTypes.STRING,
      priceOProduct: DataTypes.INTEGER,
      goWhere: DataTypes.STRING,
      styleFilter: DataTypes.STRING,
      eventFilter: DataTypes.STRING,
      imageOProduct: DataTypes.STRING,
      descriptionOProduct: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Outfit",
    }
  );
  return Outfit;
};
