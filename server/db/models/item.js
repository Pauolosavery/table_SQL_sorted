const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
  }
  Item.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATE,
    },
    title: {
      type: DataTypes.TEXT,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    distance: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'Items',
  });
  return Item;
};
