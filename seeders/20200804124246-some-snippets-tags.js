'use strict';
const Tag = require('../models').tag;
const Snippet =require('../models').snippet;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Snippet1 = await Snippet.findOne({where:{
      title:"For loops, array reduce and method chaining"
    }});
    const Snippet2 = await Snippet.findOne({where:{
      title:"What is the difference between JavaScript's for...in, for...of and forEach?"
    }});
    const Snippet3 = await Snippet.findOne({where:{
      title:"countBy"
    }});
    const Snippet4 = await Snippet.findOne({where:{
      title:"intersectionBy"
    }});
    const Snippet5 = await Snippet.findOne({where:{
      title:"objectToQueryString"
    }});
    const Tag1 = await Tag.findOne({where:{ name:"JavaScript"}});
    const Tag2 = await Tag.findOne({where:{ name:"Array"}});
    const Tag3 = await Tag.findOne({where:{ name:"Function"}});
    const Tag4 = await Tag.findOne({where:{ name:"Intermediate"}});
    const Tag5 = await Tag.findOne({where:{ name:"Object"}});

    return queryInterface.bulkInsert('snippetTags',[
      {
        tagId:Tag1.id,
        snippetId:Snippet1.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tagId:Tag2.id,
        snippetId:Snippet1.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tagId:Tag4.id,
        snippetId:Snippet3.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tagId:Tag5.id,
        snippetId:Snippet5.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tagId:Tag3.id,
        snippetId:Snippet4.id,
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
    return queryInterface.bulkDelete('snippetTags', null,{})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
