const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const WebSocketEventHandlers = require("./index");
const entryHandler = require("./Entry/entryHandler");

chai.use(sinonChai);
const { expect } = chai;

describe("WebSocketEventHandlers", () => {
  describe("message", () => {
    const message = { content: "hi", writer: {} };
    let events;
    let emitter;
    let entryHandlerPostEntryStub;
    let emitStub;

    beforeEach(() => {
      emitter = {
        emit: () => {},
      };
      emitStub = sinon.stub(emitter, "emit");
      events = WebSocketEventHandlers(emitter);
      entryHandlerPostEntryStub = sinon.stub(entryHandler, "postNewEntry");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("calls it's entryHandler.postNewEntry with message", async () => {
      await events.message(message);

      expect(entryHandlerPostEntryStub).to.have.been.calledWith(message);
    });

    it("emits the new-message after successful entry post", async () => {
      await events.message(message);

      expect(emitStub).to.have.been.calledWith("new-message", message);
    });
    it("throws if error occurs ", async () => {
      const errorMsg = "oh no, an error";
      const testError = new Error(errorMsg);

      entryHandlerPostEntryStub.throws(testError);

      try {
        await events.message(message);
        chai.assert.fail("Should have failed");
      } catch (err) {
        expect(err.message).to.equal(errorMsg);
      }
    });
  });
  describe("delete entry", () => {
    const entryInfo = {
      storiiId: "storiiId",
      entryId: "entryId",
    };
    let events;
    let emitter;
    let entryHandlerDeleteEntryStub;
    let emitStub;

    beforeEach(() => {
      emitter = {
        emit: () => {},
      };
      emitStub = sinon.stub(emitter, "emit");
      events = WebSocketEventHandlers(emitter);
      entryHandlerDeleteEntryStub = sinon.stub(entryHandler, "deleteEntry");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("calls its entryHandler.deleteEntry with entry info", async () => {
      await events.deleteEntry(entryInfo);

      expect(entryHandlerDeleteEntryStub).to.have.been.calledWith(entryInfo);
    });
    it("throws if error occurs ", async () => {
      const errorMsg = "oh no, an error";
      const testError = new Error(errorMsg);

      entryHandlerDeleteEntryStub.throws(testError);

      try {
        await events.deleteEntry(entryInfo);
        chai.assert.fail("Should have failed");
      } catch (err) {
        expect(err.message).to.equal(errorMsg);
      }
    });

    it("emits the entry-deleted after successful entry deletion", async () => {
      await events.deleteEntry(entryInfo);

      expect(emitStub).to.have.been.calledWith("entry-deleted", entryInfo);
    });
  });
});
