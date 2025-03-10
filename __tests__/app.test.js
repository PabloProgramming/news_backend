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

describe("GET: /api/articles:article:id", () => {
  test("Returns a 200 OK status when an article is fetched successfully", async () => {
    await request(app).get("/api/articles/2").expect(200);
  });

  test("Returns the article object when a valid id is provided", async () => {
    const {
      body: {article},
    } = await request(app).get("/api/articles/2");
    expect(article.article_id).toBe(2);
    expect(article.title).toBe("Sony Vaio; or, The Laptop");
    expect(article.topic).toBe("mitch");
    expect(article.author).toBe("icellusedkars");
    expect(article.body).toBe("Call me Mitchell. Some years ago..");
    expect(article.votes).toBe(0);
    expect(article.article_img_url).toBe(
      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
    );
    expect(article.created_at).toBe("2020-10-16T05:03:00.000Z");
  });
  describe("💥 Error handling tests", () => {
    test("Returns 404 when the id is not found", async () => {
      const {
        body: {msg},
      } = await request(app).get(`/api/articles/123123`).expect(404);
      expect(msg).toBe("Not Found");
    });
    test("Returns 400 when the id is not a number", async () => {
      const {
        body: {msg},
      } = await request(app).get(`/api/articles/badrequest`).expect(400);
      expect(msg).toBe("Bad Request");
    });
  });
});

