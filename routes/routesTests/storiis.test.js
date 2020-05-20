const { expect } = require("chai");
const request = require("supertest");

const app = require("../../server");
const { createDBUser, createDBStorii } = require("./customTestCommands.test");
const tokenUtils = require("../tokenUtils");

describe("storii routes", () => {
  let storii;
  let defaultUser;
  beforeEach(() => {
    storii = {
      title: "defaultTitle",
      description: "defaultDescription",
      mainGenre: "defaultGenre",
    };
    defaultUser = {
      penName: "defaultTestUser",
      email: "defaultTestUser@test.com",
      password: "defaultTestPassword",
    };
  });

  describe("Creation errors", () => {
    it("for no title", async () => {
      storii.title = "";

      const expectedErrorMsg = [
        {
          location: "body",
          msg: "A Storii needs a title",
          param: "title",
          value: "",
        },
      ];

      const user = createDBUser(defaultUser);

      const token = await tokenUtils.generateToken(user.id);
      const response = await request(app)
        .post("/storii")
        .set({
          "Content-Type": "application/json",
          "x-auth-token": token,
        })
        .send(storii);

      expect(response.statusCode).to.equal(400);
      expect(response.body.errors).to.deep.equal(expectedErrorMsg);
    });
    it("for no mainGenre", async () => {
      storii.mainGenre = "";

      const expectedErrorMsg = [
        {
          location: "body",
          msg: "A Storii needs a main genre",
          param: "mainGenre",
          value: "",
        },
      ];

      const user = await createDBUser(defaultUser);
      const token = await tokenUtils.generateToken(user.id);

      const response = await request(app)
        .post("/storii")
        .set({
          "Content-Type": "application/json",
          "x-auth-token": token,
        })
        .send(storii);

      expect(response.statusCode).to.equal(400);
      expect(response.body.errors).to.deep.equal(expectedErrorMsg);
    });
  });
  describe("POST storii", () => {
    it("is successful", async () => {
      const user = await createDBUser(defaultUser);

      const token = await tokenUtils.generateToken(user.id);

      const response = await request(app)
        .post("/storii")
        .set({
          "Content-Type": "application/json",
          "x-auth-token": token,
        })
        .send(storii);


      expect(response.statusCode).to.equal(200);
      expect(response.body.owner).to.be.a("string");
      expect(response.body.title).to.equal(storii.title);
      expect(response.body.mainGenre).to.equal(storii.mainGenre);
    });
  });

  describe("GET storii", () => {
    it("is successful", async () => {
      const user = await createDBUser(defaultUser);

      const token = await tokenUtils.generateToken(user.id);

      const storiiRes = await request(app)
        .post("/storii")
        .set({
          "Content-Type": "application/json",
          "x-auth-token": token,
        })
        .send(storii);

      const response = await request(app)
        .get(`/storii/${storiiRes.body._id}`);

      expect(response.body.title).to.equal(storii.title);
      expect(response.body.mainGenre).to.equal(storii.mainGenre);
      expect(response.body.entries).to.deep.equal([]);
    });

    it("not found", async () => {
      const unfoundObjectId = "507f1f77bcf86dd799439011";

      const response = await request(app)
        .get(`/storii/${unfoundObjectId}`);

      expect(response.statusCode).to.equal(404);
      expect(response.body).to.deep.equal({ msg: "Page not found" });
    });
  });

  describe("DELETE storii", () => {
    it("is successful if user is the owner", async () => {
      const user = await createDBUser(defaultUser);
      const token = await tokenUtils.generateToken(user.id);
      const existingStorii = await createDBStorii(user.id, storii);

      const response = await request(app)
        .delete(`/storii/${existingStorii.id}`)
        .set({
          "Content-Type": "application/json",
          "x-auth-token": token,
        });

      expect(response.statusCode).to.equal(200);
      expect(response.body).to.deep.equal({ msg: "Storii removed" });
    });
  });
  it("is unsuccessful if user is NOT the owner", async () => {
    const secondUser = {
      ...defaultUser,
      email: "secondUser@second.com",
    };
    const owner = await createDBUser(defaultUser);
    const user = await createDBUser(secondUser);
    const existingStorii = await createDBStorii(owner.id, storii);

    const userToken = await tokenUtils.generateToken(user.id);

    const response = await request(app)
      .delete(`/storii/${existingStorii.id}`)
      .set({
        "Content-Type": "application/json",
        "x-auth-token": userToken,
      });
    expect(response.statusCode).to.equal(401);
    expect(response.body).to.deep.equal({ msg: "User not authorized to delete this storii" });
  });
});
