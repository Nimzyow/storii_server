const { expect, assert } = require("chai");

const request = require("supertest");
const db = require("../../db");
const app = require("../../server");

const PORT = 4777;
describe("users routes", () => {
  let server;

  beforeEach(async () => {
    await db.connect();

    server = app.listen(PORT);
  });

  afterEach(async () => {
    server.close();
    db.disconnect();
  });

  describe("CREATE new user", () => {
    it("on no penName, get error ", (done) => {
      const newUser = {
        email: "email@email.com",
        password: "missingPenName",
      };

      const expectedErrorMsg = [
        {
          location: "body",
          msg: "Please enter a pen name",
          param: "penName",
        },
      ];
      request(app)
        .post("/users")
        .send(newUser)
        .end((err, res) => {
          if (err) {
            console.log(err);
            assert.fail(0, 1, "Did not fail an expected fail");
          }
          expect(res.statusCode).to.equal(400);
          expect(res.body.errors).to.deep.equal(expectedErrorMsg);
          done();
        });
    });
  });
});
