const { expect, assert } = require("chai");
const request = require("supertest");

const app = require("../../server");
const { createNewCustomUser } = require("./customTestCommands.test");

describe("storii routes", () => {
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
      storii.title = "";

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
              assert.fail(0, 1, "Unexpected fail");
            }
            expect(res.statusCode).to.equal(400);
            expect(res.body.errors).to.deep.equal(expectedErrorMsg);
            done();
          });
      };
      createNewCustomUser(callback);
    });
    it("for no mainGenre", (done) => {
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
              assert.fail(0, 1, "Unexpected fail");
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
              assert.fail(0, 1, "Unexpected fail");
            }

            expect(res.statusCode).to.equal(200);
            expect(res.body.owner).to.be.a("string");
            expect(res.body.title).to.equal(storii.title);
            expect(res.body.mainGenre).to.equal(storii.mainGenre);
            done();
          });
      };
      createNewCustomUser(callback);
    });
  });

  describe("GET storii", () => {
    it("is successful", (done) => {
      // MAKE CUSTOM FUNCTION:
      const callback = (token) => {
        request(app)
          .post("/storii")
          .set({
            "Content-Type": "application/json",
            "x-auth-token": token,
          })
          .send(storii)
          .end((storyErr, storiiRes) => {
            if (storyErr) {
              assert.fail(0, 1, "Unexpected fail");
            }
            request(app)
              .get(`/storii/${storiiRes.id}`)
              .end((err, res) => {
                if (err) {
                  assert.fail(0, 1, "Unexpected fail");
                }
                expect(res.body.title).to.equal(storii.title);
                expect(res.body.mainGenre).to.equal(storii.mainGenre);
                expect(res.body.entries).to.be.empty();
                done();
              });
          });
      };
      createNewCustomUser(callback);
    });
  });
});
