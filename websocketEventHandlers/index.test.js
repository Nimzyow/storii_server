const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const WebSocketEventHandlers = require("./index");
const entryHandler = require("./Entry/entryHandler");

chai.use(sinonChai);
const { expect } = chai;

describe.only("WebSocketEventHandlers", () => {
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
      entryHandlerPostEntryStub = sinon
        .stub(entryHandler, "postEntry")
        .resolves();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("calls it's entryHandler.post with message", async () => {
      await events.message(message);

      expect(entryHandlerPostEntryStub).to.have.been.calledWith(message);
    });

    it("emits the new-message after successful entry post", async () => {
      await events.message(message);

      expect(emitStub).to.have.been.calledWith("new-message", message);
    });
  });
});
