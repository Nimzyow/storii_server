const { expect, assert } = require("chai");
const request = require("supertest");

const db = require("../../db");
const app = require("../../server");
const { createNewCustomUser } = require("./customTestCommands.test");

describe.only("story routes", () => {
  describe("Creation errors", () => {
    let story;
    beforeEach(() => {
      story = {
        owner: "defaultOwner",
        title: "defaultTitle",
        description: "defaultDescription",
        mainGenre: "defaultGenre",
      };
    });
    it("for no title", (done) => {
      db.cleanDatabase();
      story.title = "";
      // post for new story with no title
      const expectedErrorMsg = [];

      const callback = (token) => {
        request(app)
          .post("/story")
          .set({
            "Content-Type": "application/json",
            "x-auth-token": token,
          })
          .send(story)
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
    it.skip("for no mainGenre", () => {

    });
  });
  describe.skip("POST story", () => {
    it("", () => {

    });
    it("", () => {

    });
  });
});
