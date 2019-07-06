const request = require("request");
const server = require("../../server");
const base = "http://localhost:4001/api/lists/";
const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;

describe("routes : items", () => {
  beforeEach(done => {
    this.list;
    this.item;
    sequelize.sync({ force: true }).then(res => {
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

  describe("POST /api/lists/list_id/items/new", () => {
    const options = {
      url: `${base}${this.list_id}/items/new`,
      form: {
        description: "Salad mix",
        purchased: false,
        list_id: this.list_id
      }
    };

    it("should create a new item", done => {
      request.post(options, (err, res, body) => {
        Item.findOne({ where: { description: "Salad Mix" } })
          .then(item => {
            expect(res.statusCode).toBe(200);
            expect(item.name).toBe("Salad Mix");
            expect(item.list_id).toBe(this.list.id);
            expect(item.purchased).toBe(false);
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });

  describe("POST /api/lists/:id/items/:id/delete", () => {
    it("should delete the item with the associated ID", done => {
      Item.findAll().then(items => {
        const itemsCountBeforeDelete = items.length;

        expect(itemsCountBeforeDelete).toBe(1);

        request.post(
          `${base}${this.list.id}/items/${this.item.id}/delete`,
          (err, res, body) => {
            Item.findAll().then(items => {
              expect(err).toBeNull();
              expect(items.length).toBe(itemsCountBeforeDelete - 1);
              done();
            });
          }
        );
      });
    });
  });

  describe("POST /api/lists/:id/items/:id/edit", () => {
    it("should update the item with the given values", done => {
      const options = {
        url: `${base}${this.list.id}/items/${this.item.id}/edit`,
        form: {
          description: "Salad Dressing"
        }
      };
      request.post(options, (err, res, body) => {
        expect(err).toBeNull();
        Item.findOne({
          where: { id: this.item.id }
        }).then(item => {
          expect(item.description).toBe("Salad Dressing");
          done();
        });
      });
    });
  });
});
