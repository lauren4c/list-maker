const request = require("request");
const server = require("../../server");
const base = "http://localhost:4001/api/lists/";
const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;

describe("routes : lists", () => {
  beforeEach(done => {
    this.list;
    sequelize.sync({ force: true }).then(res => {
      List.create({
        name: "Groceries",
        description: "weekly shopping list",
        user_id: 1
      }).then(list => {
        this.list = list;
        Item.create({
          list_id: this.list.id,
          purchased: false,
          description: "bananas",
          max_budget: 0
        }).then(item => {
          this.item = item;
          done();
        });
      });
    });
  });
  describe("#create()", () => {
    it("should create an item with a description, purchased and list id", done => {
      //#1
      Item.create({
        list_id: this.list.id,
        purchased: false,
        description: "salad",
        max_budget: 0
      })
        .then(item => {
          expect(item.description).toBe("salad");
          expect(item.purchased).toBe(false);
          expect(item.list_id).toBe(this.list.id);
          expect(item.max_budget).toBe(0);

          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
    it("should not create an item with a missing description or list id", done => {
      Item.create({
        description: "dog food"
      })
        .then(item => {
          // will catch errors in block below

          done();
        })
        .catch(err => {
          expect(err.message).toContain("Item.list_id cannot be null");

          done();
        });
    });
  });
});
