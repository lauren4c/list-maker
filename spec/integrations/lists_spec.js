const request = require("request");
const server = require("../../server");
const base = "http://localhost:4001/api/lists/";
const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;

describe("routes : lists", () => {
  beforeEach(done => {
    this.list;
    sequelize.sync({ force: true }).then(res => {
      List.create({
        name: "Groceries",
        description: "weekly shopping list",
        user_id: 1
      })
        .then(list => {
          this.list = list;
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });
  describe("GET /api/lists", () => {
    it("should return a status code 200 and all lists", done => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(this.list.name).toBe("Groceries");
        console.log(this.list.description);
        done();
      });
    });
  });
});
