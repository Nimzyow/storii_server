const { expect, assert } = require("chai");
const request = require("supertest");

const app = require("../../server");

const checkCredentialErrors = (newUser, expectedErrorMsg, done) => {
  request(app)
    .post("/users")
    .send(newUser)
    .end((err, res) => {
      if (err) {
        assert.fail(0, 1, "Unexpected fail");
      }
      expect(res.statusCode).to.equal(400);
      expect(res.body.errors).to.deep.equal(expectedErrorMsg);
      done();
    });
};

describe("users routes", () => {
  describe("POST new user", () => {
    let newUser;

    beforeEach(async () => {
      newUser = {
        email: "test@test.com",
        penName: "notGoodPenName",
        password: "missingPenName",
      };
    });

    describe("Credential errors", () => {
      it("for penName", (done) => {
        delete newUser.penName;
        const expectedErrorMsg = [
          {
            location: "body",
            msg: "Please enter a pen name",
            param: "penName",
          },
        ];
        checkCredentialErrors(newUser, expectedErrorMsg, done);
      });
      it("for email", (done) => {
        delete newUser.email;

        const expectedErrorMsg = [
          {
            location: "body",
            msg: "Please enter an email",
            param: "email",
          },
        ];

        checkCredentialErrors(newUser, expectedErrorMsg, done);
      });
      it("for password", (done) => {
        delete newUser.password;

        const expectedErrorMsg = [
          {
            location: "body",
            msg: "Please enter a password",
            param: "password",
          },
        ];

        checkCredentialErrors(newUser, expectedErrorMsg, done);
      });
    });

    it("successful response", (done) => {
      request(app)
        .post("/users")
        .send(newUser)
        .set("Content-Type", "application/json")
        .end((err, res) => {
          if (err) {
            assert.fail(0, 1, "Unexpected fail");
          }
          expect(res.statusCode).to.equal(200);
          expect(res.body.token).to.be.a("string");
          done();
        });
    });

    it("existing user error response", (done) => {
      request(app)
        .post("/users")
        .send(newUser)
        .set("Content-Type", "application/json")
        .end((err) => {
          if (err) {
            assert.fail(0, 1, "Unexpected fail");
          }
          request(app)
            .post("/users")
            .send(newUser)
            .set("Content-Type", "application/json")
            .end((error, res) => {
              if (error) {
                assert.fail(0, 1, "Unexpected fail");
              }
              expect(res.statusCode).to.equal(401);
              done();
            });
        });
    });
  });
});
