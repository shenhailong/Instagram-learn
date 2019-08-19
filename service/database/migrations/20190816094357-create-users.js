'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const { INTEGER, STRING, DATE } = Sequelize;
    return await queryInterface.createTable('users', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: STRING(255),
        allowNull: false,
      },
      username: {
        type: STRING(255),
        allowNull: false,
      },
      email: {
        type: STRING(255),
        allowNull: false,
      },
      password: {
        type: STRING(255),
        allowNull: false,
      },
      avatarUrl: STRING(255),
      mobile: STRING(32),
      prefix: STRING(32),
      abstract: {
        type: STRING(255),
        allowNull: true,
      },
      sex: {
        type: INTEGER,
        defaultValue: 0,
      },
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return await queryInterface.dropTable('users');
  },
};
