const { expect, assert } = require("chai");
const request = require("supertest");

const db = require("../../db");
const app = require("../../server");
const { createNewCustomUser } = require("./customTestCommands.test");

describe.only("storii routes", () => {
  let storii;
  beforeEach(() => {
    storii = {
      owner: "defaultOwner",
      title: "defaultTitle",
      description: "defaultDescription",
      mainGenre: "defaultGenre",
    };
  });
  describe("Creation errors", () => {
    it("for no title", (done) => {
      db.cleanDatabase();
      storii.title = "";
      // post for new storii with no title
      const expectedErrorMsg = [
        {
          location: "body",
          msg: "A Storii needs a title",
          param: "title",
          value: "",
        },
      ];

      const callback = (token) => {
        request(app)
          .post("/storii")
          .set({
            "Content-Type": "application/json",
            "x-auth-token": token,
          })
          .send(storii)
          .end((err, res) => {
            if (err) {
              assert.fail(0, 1, "Did not fail an expected fail");
            }
            expect(res.statusCode).to.equal(400);
            expect(res.body.errors).to.deep.equal(expectedErrorMsg);
            done();
          });
      };
      createNewCustomUser(callback);
    });
    it("for no mainGenre", (done) => {
      db.cleanDatabase();
      storii.mainGenre = "";
      // post for new storii with no title
      const expectedErrorMsg = [
        {
          location: "body",
          msg: "A Storii needs a main genre",
          param: "mainGenre",
          value: "",
        },
      ];

      const callback = (token) => {
        request(app)
          .post("/storii")
          .set({
            "Content-Type": "application/json",
            "x-auth-token": token,
          })
          .send(storii)
          .end((err, res) => {
            if (err) {
              assert.fail(0, 1, "Did not fail an expected fail");
            }
            expect(res.statusCode).to.equal(400);
            expect(res.body.errors).to.deep.equal(expectedErrorMsg);
            done();
          });
      };
      createNewCustomUser(callback);
    });
  });
  describe("POST storii", () => {
    it("is successful", (done) => {
      db.cleanDatabase();
      const callback = (token) => {
        request(app)
          .post("/storii")
          .set({
            "Content-Type": "application/json",
            "x-auth-token": token,
          })
          .send(storii)
          .end((err, res) => {
            if (err) {
              assert.fail(0, 1, "Did not fail an expected fail");
            }
            expect(res.statusCode).to.equal(200);
            expect(res.body.storii).to.deep.equal("");
            done();
          });
      };
      createNewCustomUser(callback);
    });
    it("", () => {

    });
  });
});
