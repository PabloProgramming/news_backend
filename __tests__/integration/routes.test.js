const request = require("supertest");
const app = require("../../app");

describe("💥 ANY:/notAPath", () => {
  test("404: Returns Not Found for a non-existing path", async () => {
    const {
      body: {msg},
    } = await request(app).get("/notAPath").expect(404);
    expect(msg).toBe("Path does not exist");
  });
});

