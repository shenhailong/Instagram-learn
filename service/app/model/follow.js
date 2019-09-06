'use strict';
module.exports = app => {
  const { STRING, INTEGER, DATE, NOW } = app.Sequelize;
  const Follow = app.model.define('follow', {
    id: {
      type: INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: STRING(255),
    },
    followedId: {
      type: STRING(255),
    },
    status: {
      type: INTEGER(1),
      allowNull: false,
    },
    created_at: {
      type: DATE,
      defaultValue: NOW,
    },
    updated_at: {
      type: DATE,
      defaultValue: NOW,
    },
  }, {
    freezeTableName: true, // 不自动加复数
  });
  return Follow;
};
