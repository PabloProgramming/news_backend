require("../../test-setup/setupTestDB");
const request = require("supertest");
const app = require("../../app");
const endpointsJson = require("../../endpoints.json");

describe("GET: /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", async () => {
    const {
      body: {endpoints},
    } = await request(app).get("/api").expect(200);
    expect(endpoints).toEqual(endpointsJson);
  });
});

