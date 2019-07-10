const request = require("request");
const server = require("../../server");
const base = "http://localhost:4001/api/lists/";
const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;
const User = require("../../src/db/models").User;

describe("routes : lists", () => {
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
            user_id: this.user.id,
            items: [
              {
                description: "Bananas",
                purchased: false
              }
            ]
          },
          {
            include: {
              model: Item,
              as: "items"
            }
          }
        ).then(list => {
          this.list = list;
          this.item = list.items[0];
          done();
        });
      });
    });
  });
  describe("GET /api/lists/users/userId", () => {
    beforeEach(done => {
      User.create({
        email: "aspen@gmail.com",
        password: "ILovePets"
      }).then(user => {
        request.get(
          {
            url: "http://localhost:4001/auth/fake",
            form: {
              userId: user.id,
              email: user.email,
              password: user.password
            }
          },
          (err, res, body) => {
            done();
          }
        );
      });
    });
    it("should return a status code 200 and all lists for the user", done => {
      request.get(`${base}user/${this.user.id}`, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(this.list.name).toBe("Groceries");
        done();
      });
    });
  });
  describe("POST /api/lists/new", () => {
    const options = {
      url: `${base}new`,
      form: {
        name: "Pet Store",
        user_id: 1
      }
    };

    it("should create a new list", done => {
      request.post(options, (err, res, body) => {
        List.findOne({ where: { name: "Pet Store" } })
          .then(list => {
            expect(res.statusCode).toBe(200);
            expect(list.name).toBe("Pet Store");
            expect(list.user_id).toBe(1);
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });
  describe("GET /api/lists/:id", () => {
    it("should return the selected list", done => {
      request.get(`${base}${this.list.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Groceries");
        done();
      });
    });
  });
  describe("POST /api/list/:id/delete", () => {
    it("should delete the list with the associated ID", done => {
      List.findAll().then(lists => {
        const listCountBeforeDelete = lists.length;

        expect(listCountBeforeDelete).toBe(1);

        request.post(`${base}${this.list.id}/delete`, (err, res, body) => {
          List.findAll().then(lists => {
            expect(err).toBeNull();
            expect(lists.length).toBe(listCountBeforeDelete - 1);
            done();
          });
        });
      });
    });
  });

  describe("POST /api/lists/:id/edit", () => {
    it("should update the list with the given values", done => {
      const options = {
        url: `${base}${this.list.id}/edit`,
        form: {
          Lowes: ""
        }
      };
      request.post(options, (err, res, body) => {
        expect(err).toBeNull();
        List.findOne({
          where: { id: this.list.id }
        }).then(list => {
          expect(list.name).toBe("Lowes");
          done();
        });
      });
    });
  });
});
