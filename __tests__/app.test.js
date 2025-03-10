const endpointsJson = require("../endpoints.json");
const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("💥 ANY:/notAPath", () => {
  test("404: Returns Not Found for a non-existing path", async () => {
    const {
      body: {msg},
    } = await request(app).get("/notAPath").expect(404);
    expect(msg).toBe("Path does not exist");
  });
});

describe("GET: /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", async () => {
    const {
      body: {endpoints},
    } = await request(app).get("/api").expect(200);
    expect(endpoints).toEqual(endpointsJson);
  });
});

describe("GET: /api/topics", () => {
  test("Returns a 200 OK status when topics are fetched successfully", async () => {
    await request(app).get("/api/topics").expect(200);
  });
  test("Returns an array of all topics", async () => {
    const {
      body: {topics},
    } = await request(app).get("/api/topics");
    expect(topics.length).not.toBe(0);
    topics.forEach((topic) => {
      expect(topic).toHaveProperty("slug");
      expect(topic).toHaveProperty("description");
      expect(topic).toHaveProperty("img_url");
    });
  });
});




