const { expect } = require("chai");
const request = require("supertest");

const app = require("../../server");
const { createDBUser, createDBStorii, createDBEntry } = require("./customTestCommands.test");
const tokenUtils = require("../tokenUtils");

describe("entries route", () => {
  describe("POST entry", () => {
    it("errors for no content", async () => {
      const expectedErrorMsg = [
        {
          location: "body",
          msg: "An entry needs content!",
          param: "content",
          value: "",
        },
      ];
      const existingUser = await createDBUser();
      const existingStorii = await createDBStorii(existingUser.id);

      const existingUserToken = await tokenUtils.generateToken(existingUser.id);

      const entry = {
        content: "",
      };

      const response = await request(app)
        .post(`/storii/${existingStorii.id}/entry`)
        .set({
          "Content-Type": "application/json",
          "x-auth-token": existingUserToken,
        })
        .send(entry);

      expect(response.statusCode).to.equal(400);
      expect(response.body.errors).to.deep.equal(expectedErrorMsg);
    });

    it("is successful", async () => {
      const existingUser = await createDBUser();
      const existingStorii = await createDBStorii(existingUser.id);

      const existingUserToken = await tokenUtils.generateToken(existingUser.id);

      const entry = {
        content: "I really enjoy ow",
      };

      const response = await request(app)
        .post(`/storii/${existingStorii.id}/entry`)
        .set({
          "Content-Type": "application/json",
          "x-auth-token": existingUserToken,
        })
        .send(entry);

      expect(response.statusCode).to.equal(200);
      expect(response.body).to.deep.equal({ msg: "New entry successful!" });
    });
  });

  describe("GET entry", async () => {
    const existingUser = await createDBUser();
    const existingStorii = await createDBStorii(existingUser.id);
    const existingUserToken = await tokenUtils.generateToken(existingUser.id);

    const entry = await createDBEntry(existingUser.id, existingStorii.id);

    const response = await request(app)
      .get(`/storii/${existingStorii.id}/entry`)
      .set({
        "x-auth-token": existingUserToken,
      });

    expect(response.statusCode).to.equal(200);
    expect(response.body).to.deep.equal(entry);
  });

  describe("PATCH entry", async () => {
    const existingUser = await createDBUser();
    const existingStorii = await createDBStorii(existingUser.id);
    const existingUserToken = await tokenUtils.generateToken(existingUser.id);

    const entry = await createDBEntry(existingUser.id, existingStorii.id);

    const patchedContentEntry = {
      content: "This has been patched",
    };

    const response = await request(app)
      .patch(`/storii/${existingStorii.id}/entry/${entry.id}`)
      .set({
        "x-auth-token": existingUserToken,
      })
      .send(patchedContentEntry);

    expect(response.statusCode).to.equal(200);
    expect(response.body).to.deep.equal(patchedContentEntry);
  });

  describe("DELETE entry", () => {

  });
});
