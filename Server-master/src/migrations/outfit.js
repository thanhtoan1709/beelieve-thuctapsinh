"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Outfits", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      outfitName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      topProductId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bottomProductId: {
        type: Sequelize.STRING,

        allowNull: false,
      },

      priceOProduct: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      goWhere: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      styleFilter: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      eventFilter: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageOProduct: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      descriptionOProduct: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Outfits");
  },
};
