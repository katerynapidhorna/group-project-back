'use strict';
const User = require('../models').user;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user1 = await User.findOne({where:{email:'test@test.com'}});
    const user2 = await User.findOne({where:{email:'a@a.com'}});

    return queryInterface.bulkInsert('snippets',[
      {
        title:"For loops, array reduce and method chaining",
        snippet:"// const files = [ 'foo.txt ', '.bar', '   ', 'baz.foo' ];// let filePaths = [];// for (let file of files) {//   const fileName = file.trim();//   if(fileName) {//     const filePath = `~/cool_app/${fileName}`;//     filePaths.push(filePath);//   } // } // // filePaths = [ '~/cool_app/foo.txt', '~/cool_app/.bar', '~/cool_app/baz.foo']",
        url:"https://www.30secondsofcode.org/blog/s/code-anatomy-chaining-reduce-for-loop",
        userId:user1.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title:"What is the difference between JavaScript's for...in, for...of and forEach?",
        snippet:"// for (let prop in ['a', 'b', 'c']) //   console.log(prop);            // 0, 1, 2 (array indexes) // for (let prop in 'str') //   console.log(prop);            // 0, 1, 2 (string indexes) // for (let prop in {a: 1, b: 2, c: 3}) //   console.log(prop);            // a, b, c (object property names)// for (let prop in new Set(['a', 'b', 'a', 'd'])) //   console.log(prop);            // undefined (no enumerable properties)",
        url:"https://www.30secondsofcode.org/blog/s/javascript-for-in-for-of-foreach",
        userId:user2.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title:"countBy",
        snippet:"// const countBy = (arr, fn) => //   arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => { //     acc[val] = (acc[val] || 0) + 1; //     return acc; //   }, {}); // EXAMPLES // countBy([6.1, 4.2, 6.3], Math.floor); // {4: 1, 6: 2} // countBy(['one', 'two', 'three'], 'length'); // {3: 2, 5: 1} // countBy([{ count: 5 }, { count: 10 }, { count: 5 }], x => x.count) // {5: 2, 10: 1}",
        url:"https://www.30secondsofcode.org/js/s/count-by",
        userId:user1.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },      {
        title:"intersectionBy",
        snippet:"// const intersectionBy = (a, b, fn) => { //   const s = new Set(b.map(fn)); //   return [...new Set(a)].filter(x => s.has(fn(x))); // }; // EXAMPLES // intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [2.1] // intersectionBy([{ title: 'Apple' }, { title: 'Orange' }], [{ title: 'Orange' }, { title: 'Melon' }], x => x.title) // [{ title: 'Orange' }]",
        url:"https://www.30secondsofcode.org/js/s/intersection-by",
        userId:user1.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title:"objectToQueryString",
        snippet:"// const objectToQueryString = queryParameters => { //   return queryParameters //     ? Object.entries(queryParameters).reduce((queryString, [key, val], index) => { //       const symbol = queryString.length === 0 ? '?' : '&'; //       queryString += typeof val === 'string' ? `${symbol}${key}=${val}` : ''; //       return queryString; //     }, '') //     : ''; // }; // EXAMPLES // objectToQueryString({ page: '1', size: '2kg', key: undefined }); // '?page=1&size=2kg'",
        url:"https://www.30secondsofcode.org/js/s/object-to-query-string",
        userId:user2.id,
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
    return queryInterface.bulkDelete("snippets", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
