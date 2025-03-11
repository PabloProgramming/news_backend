const endpointsJson = require("../endpoints.json");
const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));

afterAll(() => db.end());

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
    } = await request(app).get("/api/topics").expect(200);
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
    } = await request(app).get("/api/articles/2").expect(200);
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

describe("GET: /api/articles", () => {
  test("Returns a 200 OK status when articles are fetched successfully", async () => {
    await request(app).get("/api/articles").expect(200);
  });
  test("Returns an array of all articles sorted by date in desc order", async () => {
    const {
      body: {articles},
    } = await request(app).get("/api/articles").expect(200);
    expect(articles.length).not.toBe(0);
    expect(articles).toBeSortedBy("created_at", {descending: true});
    articles.forEach((article) => {
      expect(article).toHaveProperty("article_id");
      expect(article).toHaveProperty("title");
      expect(article).toHaveProperty("topic");
      expect(article).toHaveProperty("created_at");
      expect(article).toHaveProperty("votes");
      expect(article).toHaveProperty("author");
      expect(article).toHaveProperty("article_img_url");
      expect(article).toHaveProperty("comment_count");
    });
  });
  test("Returns an array of all articles sorted by date in asc order", async () => {
    const {
      body: {articles},
    } = await request(app).get("/api/articles?order=asc").expect(200);
    expect(articles.length).not.toBe(0);
    expect(articles).toBeSortedBy("created_at", {ascending: true});
  });
  describe("💥 Error handling tests", () => {
    test("Returns 400 when provided with wrong query sort_by values", async () => {
      const {
        body: {msg},
      } = await request(app)
        .get("/api/articles?sort_by=invalid_column")
        .expect(400);
      expect(msg).toBe("Bad Request");
    });

    test("Returns 400 when provided with wrong query order values", async () => {
      const {
        body: {msg},
      } = await request(app)
        .get("/api/articles?sort_by=created_at&order=invalid")
        .expect(400);
      expect(msg).toBe("Bad Request");
    });
  });
});

describe("GET: /api/articles:article:id/comments", () => {
  test("Returns a 200 OK status when an comments are fetched successfully", async () => {
    await request(app).get("/api/articles/2/comments").expect(200);
  });

  test("Returns an array of comments when a valid article_id is provided", async () => {
    const {
      body: {comments},
    } = await request(app).get("/api/articles/3/comments");
    expect(comments.length).not.toBe(0);
    expect(comments).toBeSortedBy("created_at", {descending: true});
    comments.forEach((comment) => {
      expect(comment).toHaveProperty("comment_id");
      expect(comment).toHaveProperty("votes");
      expect(comment).toHaveProperty("created_at");
      expect(comment).toHaveProperty("author");
      expect(comment).toHaveProperty("body");
      expect(comment).toHaveProperty("article_id");
      expect(comment.article_id).toBe(3);
    });
  });
    test("Returns an array of comments by article_id sorted by date in asc order", async () => {
      const {
        body: {comments},
      } = await request(app)
        .get("/api/articles/3/comments?order=asc")
          .expect(200);
      expect(comments.length).not.toBe(0);
      expect(comments).toBeSortedBy("created_at", {ascending: true});
    });
});




