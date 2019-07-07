const request = require("request");
const server = require("../../server");
const base = "http://localhost:4001/api/users/";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {
  beforeEach(done => {
    sequelize
      .sync({ force: true })
      .then(() => {
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });

  describe("POST /api/users", () => {
    it("should create a new user with valid values", done => {
      const options = {
        url: base,
        form: {
          email: "user@example.com",
          password: "123456789"
        }
      };

      request.post(options, (err, res, body) => {
        User.findOne({ where: { email: "user@example.com" } })
          .then(user => {
            expect(user).not.toBeNull();
            expect(user.email).toBe("user@example.com");
            expect(user.id).toBe(1);
            done();
          })
          .catch(err => {
            done();
          });
      });
    });

    it("should not create a new user with invalid attributes", done => {
      request.post(
        {
          url: base,
          form: {
            email: "no",
            password: "123456789"
          }
        },
        (err, res, body) => {
          User.findOne({ where: { email: "no" } })
            .then(user => {
              expect(user).toBeNull();
              done();
            })
            .catch(err => {
              done();
            });
        }
      );
    });
  });
});
