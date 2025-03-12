require("../../test-setup/setupTestDB");
const request = require("supertest");
const app = require("../../app");

describe("GET: /api/topics", () => {
  test("Returns a 200 OK status when topics are fetched successfully", async () => {
    await request(app).get("/api/topics").expect(200);
  });
  test("Returns an array of all topics", async () => {
    const {
      body: {topics},
    } = await request(app).get("/api/topics").expect(200);
    expect(topics.length).not.toBe(0);
    topics.forEach((topic) => {
      expect(topic).toHaveProperty("slug");
      expect(topic).toHaveProperty("description");
      expect(topic).toHaveProperty("img_url");
    });
  });
});

