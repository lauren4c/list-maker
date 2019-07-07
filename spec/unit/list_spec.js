const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;
const User = require("../../src/db/models").User;

describe("Lists", () => {
  beforeEach(done => {
    this.list;
    this.item;
    this.user;
    sequelize.sync({ force: true }).then(res => {
      User.create({
        email: "sammybear@gmail.com",
        password: "ILoveSnacks"
      }).then(user => {
        this.user = user;

        List.create(
          {
            name: "Groceries",
            description: "weekly shopping list",
            user_id: 1,
            id: 1,
            items: [
              {
                description: "Bananas",
                purchased: false,
                list_id: 1
              }
            ]
          },
          {
            include: {
              model: Item,
              as: "items"
            }
          }
        )
          .then(list => {
            this.list = list;
            this.item = list.items[0];
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });
  describe("#create()", () => {
    it("should create a list object with a name, userID, and description,", done => {
      //#1
      List.create({
        name: "Target List",
        description: "I always end up with more than what's on the list"
      })
        .then(list => {
          expect(list.name).toBe("Target List");
          expect(list.description).toBe(
            "I always end up with more than what's on the list"
          );
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });

    it("should not create a list with missing name, or userID", done => {
      List.create({
        description: "Send help!"
      })
        .then(list => {
          //we'll catch errors in the next block
          done();
        })
        .catch(err => {
          expect(err.message).toContain("List.name cannot be null");

          done();
        });
    });
  });

  describe("#getItems()", () => {
    it("should return all the items associated with this list", done => {
      this.list.getItems().then(associatedItems => {
        expect(associatedItems[0].description).toBe("Bananas");
        done();
      });
    });
  });
});
