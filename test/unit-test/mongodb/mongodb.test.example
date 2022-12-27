import * as chai from "chai";
import { db } from "../../../src/mongodb/MongoDBConnection";
import { clearDatabase, setupDatabase } from "../../setup/db.setup";

(async () => {
  await db.init();
})();

const expect = chai.expect;

describe("Testing MongoDB Connection", () => {
  beforeEach(async () => {
    console.log("Connecting to db before test");
    await db.connect();
  });
  afterEach(async () => {
    console.log("Closing to db after test");
    await db.close();
  });

  it("Able to reset DB", async () => {
    const cleared = await clearDatabase();
    expect(cleared).to.be.true;
  });

  it("Able to connect DB", async () => {
    const ready = await setupDatabase();
    expect(ready).to.be.true;
  });

  it("Able to get collection", async () => {
    const c = await db.getCollection("TEST");
    const inserted = await c.insertOne({ a: "Issam" });
    expect(c).to.not.be.null;
  });
});
