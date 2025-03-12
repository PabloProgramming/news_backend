require("../../test-setup/setupTestDB");
const request = require("supertest");
const app = require("../../app");
describe("ENDPOINT: /api/articles", () => {
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
    test("Returns an array of all articles sorted by article_id in asc order", async () => {
      const {
        body: {articles},
      } = await request(app)
        .get("/api/articles?sort_by=article_id&order=asc")
        .expect(200);
      expect(articles.length).not.toBe(0);
      expect(articles).toBeSortedBy("article_id", {ascending: true});
    });
    test("Returns an array of all articles sorted by title in desc order", async () => {
      const {
        body: {articles},
      } = await request(app).get("/api/articles?sort_by=title").expect(200);
      expect(articles.length).not.toBe(0);
      expect(articles).toBeSortedBy("title", {descending: true});
    });
    test("Returns an array of all articles sorted by topic in desc order", async () => {
      const {
        body: {articles},
      } = await request(app).get("/api/articles?sort_by=topic").expect(200);
      expect(articles.length).not.toBe(0);
      expect(articles).toBeSortedBy("topic", {descending: true});
    });
    test("Returns an array of all articles sorted by author in desc order", async () => {
      const {
        body: {articles},
      } = await request(app).get("/api/articles?sort_by=author").expect(200);
      expect(articles.length).not.toBe(0);
      expect(articles).toBeSortedBy("author", {descending: true});
    });
    test("Returns an array of all articles sorted by votes in desc order", async () => {
      const {
        body: {articles},
      } = await request(app).get("/api/articles?sort_by=votes").expect(200);
      expect(articles.length).not.toBe(0);
      expect(articles).toBeSortedBy("votes", {descending: true});
    });
    test("Returns an array of all articles sorted by article_img_url in desc order", async () => {
      const {
        body: {articles},
      } = await request(app)
        .get("/api/articles?sort_by=article_img_url")
        .expect(200);
      expect(articles.length).not.toBe(0);
      expect(articles).toBeSortedBy("article_img_url", {descending: true});
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
});

describe("ENDPOINT: /api/articles/article:id", () => {
  describe("GET: /api/articles/article:id", () => {
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
        expect(msg).toBe("Article not found");
      });
      test("Returns 400 when the id is not a number", async () => {
        const {
          body: {msg},
        } = await request(app).get(`/api/articles/badrequest`).expect(400);
        expect(msg).toBe("Bad Request");
      });
    });
  });
  describe("PATCH: /api/articles/article:id", () => {
    test("Returns a 200 OK status when an article is updated successfully", async () => {
      await request(app)
        .patch("/api/articles/2")
        .send({inc_votes: 3})
        .expect(200);
    });

    test("Returns the article object with votes updated when are positive", async () => {
      const {
        body: {updatedArticle},
      } = await request(app)
        .patch("/api/articles/2")
        .send({inc_votes: 3})
        .expect(200);
      expect(updatedArticle.article_id).toBe(2);
      expect(updatedArticle.title).toBe("Sony Vaio; or, The Laptop");
      expect(updatedArticle.topic).toBe("mitch");
      expect(updatedArticle.author).toBe("icellusedkars");
      expect(updatedArticle.body).toBe("Call me Mitchell. Some years ago..");
      expect(updatedArticle.votes).toBe(3);
      expect(updatedArticle.article_img_url).toBe(
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
      );
      expect(updatedArticle.created_at).toBe("2020-10-16T05:03:00.000Z");
    });
    test("Returns the article object with votes updated when are negative", async () => {
      const {
        body: {updatedArticle},
      } = await request(app)
        .patch("/api/articles/1")
        .send({inc_votes: -50})
        .expect(200);
      expect(updatedArticle.article_id).toBe(1);
      expect(updatedArticle.title).toBe("Living in the shadow of a great man");
      expect(updatedArticle.topic).toBe("mitch");
      expect(updatedArticle.author).toBe("butter_bridge");
      expect(updatedArticle.body).toBe("I find this existence challenging");
      expect(updatedArticle.votes).toBe(50);
      expect(updatedArticle.article_img_url).toBe(
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
      );
      expect(updatedArticle.created_at).toBe("2020-07-09T20:11:00.000Z");
    });
    describe("💥 Error handling tests", () => {
      test("Returns 404 when the id is not found", async () => {
        const {
          body: {msg},
        } = await request(app).patch(`/api/articles/123123`).expect(404);
        expect(msg).toBe("Article not found");
      });
      test("Returns 400 when the id is not a number", async () => {
        const {
          body: {msg},
        } = await request(app).patch(`/api/articles/badrequest`).expect(400);
        expect(msg).toBe("Bad Request");
      });
      test("Returns 400 if inc_votes is not provided", async () => {
        const {
          body: {msg},
        } = await request(app).patch("/api/articles/2").send({}).expect(400);
        expect(msg).toBe("Bad Request");
      });
    });
  });
});

