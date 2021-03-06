const { expect } = require("chai");
const request = require("supertest");

const app = require("../../server");
const { createDBUser, createDBStorii, createDBEntry } = require("./customTestCommands.test");
const tokenUtils = require("../tokenUtils");

describe("entries route", () => {
  let existingUser;
  let existingStorii;
  let existingUserToken;

  beforeEach(async () => {
    existingUser = await createDBUser();
    existingStorii = await createDBStorii(existingUser.id);
    existingUserToken = await tokenUtils.generateToken(existingUser.id);
  });
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
      expect(response.body.msg).to.equal("New entry successful!");
      expect(response.body.entry.content).to.equal(entry.content);
    });
  });

  describe("GET entry", () => {
    it("is successful", async () => {
      const entry = await createDBEntry(existingUser.id, existingStorii.id);

      const response = await request(app)
        .get(`/storii/${existingStorii.id}/entry/${entry.id}`)
        .set({
          "x-auth-token": existingUserToken,
        });

      expect(response.statusCode).to.equal(200);
      expect(response.body.entry.content).to.equal(entry.content);
      expect(response.body.entry.writer).to.equal(entry.writer.toString());
      expect(response.body.entry.storiiId).to.equal(entry.storiiId.toString());
    });
  });

  describe("PATCH entry", () => {
    let entry;
    let patchedContentEntry;

    beforeEach(async () => {
      entry = await createDBEntry(existingUser.id, existingStorii.id);

      patchedContentEntry = {
        content: "This has been patched",
      };
    });
    it("is successful", async () => {
      const expectedResult = {
        msg: "Entry updated successfully",
      };

      const response = await request(app)
        .patch(`/storii/${existingStorii.id}/entry/${entry.id}`)
        .set({
          "x-auth-token": existingUserToken,
        })
        .send(patchedContentEntry);

      expect(response.statusCode).to.equal(200);
      expect(response.body).to.deep.equal(expectedResult);
    });

    it("is unsuccessful if not part of the storii", async () => {
      const unknownUser = await createDBUser({
        penName: "IdoNotBelongHERE",
        email: "doNotLetMeWrite@Here.com",
        password: "WAHT?",
      });

      const unknownUserToken = await tokenUtils.generateToken(unknownUser.id);

      const expectedResult = {
        msg: "Unauthorized user",
      };

      const response = await request(app)
        .patch(`/storii/${existingStorii.id}/entry/${entry.id}`)
        .set({
          "Content-Type": "application/json",
          "x-auth-token": unknownUserToken,
        })
        .send(patchedContentEntry);

      expect(response.statusCode).to.equal(401);
      expect(response.body).to.deep.equal(expectedResult);
    });
  });

  describe("DELETE entry", () => {
    it("successful", async () => {
      const entry = await createDBEntry(existingUser.id, existingStorii.id);

      const response = await request(app)
        .delete(`/storii/${existingStorii.id}/entry/${entry.id}`)
        .set("x-auth-token", existingUserToken);

      expect(response.statusCode).to.equal(200);
      expect(response.body).to.deep.equal({ msg: "Entry deleted" });
    });

    it("is unsuccessful if user is NOT the owner/admin", async () => {
      const secondaryUser = {
        penName: "second",
        email: "secondUser@second.com",
        password: "654321",
      };

      const secondUser = await createDBUser(secondaryUser);

      const secondUserToken = await tokenUtils.generateToken(secondUser.id);

      const entry = await createDBEntry(existingUser.id, existingStorii.id);

      const response = await request(app)
        .delete(`/storii/${existingStorii.id}/entry/${entry.id}`)
        .set("x-auth-token", secondUserToken);

      expect(response.statusCode).to.equal(401);
      expect(response.body).to.deep.equal({ msg: "Unauthorized user" });
    });
  });
});
