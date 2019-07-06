// const request = require("request");
// const server = require("../../server");
// const base = "http://localhost:4001/api/lists/";
// const sequelize = require("../../src/db/models/index").sequelize;
// const List = require("../../src/db/models").List;
// const Item = require("../../src/db/models").Item;
//
// describe("routes : lists", () => {
//   beforeEach(done => {
//     this.list;
//     sequelize.sync({ force: true }).then(res => {
//       List.create(
//         {
//           name: "Pet Store",
//           description: "the animals are needy",
//           user_id: 1,
//           items: [
//             {
//               description: "Kitty Litter",
//               purchased: false,
//               list_id: this.list.id
//             }
//           ]
//         },
//         {
//           include: {
//             model: Item,
//             as: "items"
//           }
//         }
//       )
//         .then(list => {
//           this.list = list;
//           this.item = list.items[0];
//           done();
//         })
//         .catch(err => {
//           console.log(err);
//           done();
//         });
//     });
//   });
//   describe("#create()", () => {
//     it("should create an item with a description, purchased and list id", done => {
//       //#1
//       Item.create({
//         list_id: this.list.id,
//         purchased: false,
//         description: "dog kibble"
//       })
//         .then(item => {
//           expect(item.description).toBe("dog kibble");
//           expect(item.purchased).toBe(false);
//           expect(item.list_id).toBe(this.list.id);
//
//           done();
//         })
//         .catch(err => {
//           console.log(err);
//           done();
//         });
//     });
//     it("should not create an item with a missing description or list id", done => {
//       Item.create({
//         description: "dog food"
//       })
//         .then(item => {
//           // will catch errors in block below
//           done();
//         })
//         .catch(err => {
//           expect(err.message).toContain("Item.list_id cannot be null");
//
//           done();
//         });
//     });
//   });
// });
