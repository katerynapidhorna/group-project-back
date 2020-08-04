'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tags',[
      {
        name:'JavaScript',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:"Array",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:"Function",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:"Intermediate",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:"Object",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("tags", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
