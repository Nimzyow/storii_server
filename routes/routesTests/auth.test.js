const { expect, assert } = require("chai");
const request = require("supertest");

const db = require("../../db");
const app = require("../../server");

const checkCredentialErrors = (user, expectedErrorMsg, done) => {
  request(app)
    .post("/auth")
    .send(user)
    .end((err, res) => {
      if (err) {
        assert.fail(0, 1, "Did not fail an expected fail");
      }
      expect(res.statusCode).to.equal(400);
      expect(res.body.errors).to.deep.equal(expectedErrorMsg);
      done();
    });
};

describe("auth routes", () => {
  describe("POST user sign in", () => {
    let user;

    beforeEach(() => {
      db.cleanDatabase();
      user = {
        email: "user@test.com",
        password: "existingPassword",
      };
    });

    describe("Credential errors", () => {
      it("on email", (done) => {
        delete user.email;

        const expectedErrorMsg = [
          {
            location: "body",
            msg: "Please enter an email",
            param: "email",
          },
        ];

        checkCredentialErrors(user, expectedErrorMsg, done);
      });
      it("on password", (done) => {
        delete user.password;

        const expectedErrorMsg = [
          {
            location: "body",
            msg: "Please enter a password",
            param: "password",
          },
        ];

        checkCredentialErrors(user, expectedErrorMsg, done);
      });
    });

    it("denied because email doesn't exist", (done) => {
      const expectedMessage = "Invalid credentials";
      request(app)
        .post("/auth")
        .send(user)
        .end((err, res) => {
          if (err) {
            assert.fail(0, 1, "Did not fail an expected fail");
          }
          expect(res.statusCode).to.equal(401);
          expect(res.body.msg).to.deep.equal(expectedMessage);
          done();
        });
    });

    it("denied because password doesn't match", (done) => {
      user.penName = "habibo";
      // make a user
      request(app)
        .post("/users")
        .send(user)
        .set("Content-Type", "application/json")
        .end(() => {
          user.password = "WRONG!";
          const expectedMessage = "Incorrect password";
          request(app)
            .post("/auth")
            .send(user)
            .end((err, res) => {
              if (err) {
                assert.fail(0, 1, "Did not fail an expected fail");
              }
              expect(res.statusCode).to.equal(401);
              expect(res.body.msg).to.deep.equal(expectedMessage);
              done();
            });
        });
    });
  });
});
