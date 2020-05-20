const { expect } = require("chai");
const request = require("supertest");

const app = require("../../server");
const { createDBUser, createDBStorii } = require("./customTestCommands.test");
const tokenUtils = require("../tokenUtils");

describe("entries route", () => {
  describe("POST entry", () => {
    it.only("errors for no content", async () => {
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

      const response = request(app)
        .post(`/story/${existingStorii.id}/entry`)
        .set({
          "Content-Type": "application/json",
          "x-auth-token": existingUserToken,
        })
        .send(entry);

      expect(response.statusCode).to.equal(400);
      expect(response.body.errors).to.deep.equal(expectedErrorMsg);
    });

    it.only("is successful", async () => {
      const existingUser = await createDBUser();
      const existingStorii = await createDBStorii(existingUser.id);

      const existingUserToken = await tokenUtils.generateToken(existingUser.id);

      const entry = {
        content: "I really enjoy ow",
      };

      const response = request(app)
        .post(`/story/${existingStorii.id}/entry`)
        .set({
          "Content-Type": "application/json",
          "x-auth-token": existingUserToken,
        })
        .send(entry);

      expect(response.statusCode).to.equal(200);
      expect(response.body).to.deep.equal({ msg: "New entry successful!" });
    });
  });

  describe("GET entry", () => {

  });

  describe("PATCH entry", () => {

  });

  describe("DELETE entry", () => {

  });
});
