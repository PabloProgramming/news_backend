require("../../test-setup/setupTestDB");
const request = require("supertest");
const app = require("../../app");

describe("ENDPOINT: /api/articles:article:id/comments", () => {
  describe("GET: /api/articles:article:id/comments", () => {
    test("Returns a 200 OK status when an comments are fetched successfully", async () => {
      await request(app).get("/api/articles/3/comments").expect(200);
    });

    test("Returns an array of comments when a valid article_id is provided", async () => {
      const {
        body: {comments},
      } = await request(app).get("/api/articles/3/comments");
      expect(comments.length).toBe(2);
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
      expect(comments.length).toBe(2);
      expect(comments).toBeSortedBy("created_at", {ascending: true});
    });
    describe("💥 Error handling tests", () => {
      test("Returns 404 when the article_id is not found", async () => {
        const {
          body: {msg},
        } = await request(app).get(`/api/articles/123123/comments`).expect(404);
        expect(msg).toBe("Not Found");
      });
      test("Returns 400 when the article_id is not a number", async () => {
        const {
          body: {msg},
        } = await request(app)
          .get(`/api/articles/badrequest/comments`)
          .expect(400);
        expect(msg).toBe("Bad Request");
      });
      test("Returns 400 when provided with wrong query sort_by values", async () => {
        const {
          body: {msg},
        } = await request(app)
          .get("/api/articles/3/comments?sort_by=invalid_column")
          .expect(400);
        expect(msg).toBe("Bad Request");
      });
      test("Returns 400 when provided with wrong query order values", async () => {
        const {
          body: {msg},
        } = await request(app)
          .get("/api/articles/3/comments?sort_by=created_at&order=invalid")
          .expect(400);
        expect(msg).toBe("Bad Request");
      });
      test("Returns 404 when there are not comments associated with provided article_id", async () => {
        const {
          body: {msg},
        } = await request(app).get("/api/articles/2/comments").expect(404);
        expect(msg).toBe("Not Found");
      });
    });
  });

  describe("POST: /api/articles/:article_id/comments", () => {
    test("Returns a 201 status when comment is created successfully", async () => {
      const testComment = {username: "lurker", body: "Bad article!"};
      await request(app)
        .post("/api/articles/3/comments")
        .send(testComment)
        .expect(201);
    });
    test("Returns newly creataed comment with correct properties", async () => {
      const testComment = {username: "rogersop", body: "Great article!"};
      const {
        body: {newComment},
      } = await request(app)
        .post("/api/articles/2/comments")
        .send(testComment)
        .expect(201);

      expect(newComment).toHaveProperty("comment_id");
      expect(newComment).toHaveProperty("author", testComment.username);
      expect(newComment).toHaveProperty("body", testComment.body);
      expect(newComment).toHaveProperty("article_id", 2);
      expect(newComment).toHaveProperty("created_at");
      expect(newComment).toHaveProperty("votes", 0);
    });
  });
  describe("💥 Error handling tests", () => {
    test("Returns 404 when the article_id is not found", async () => {
      const {
        body: {msg},
      } = await request(app).post(`/api/articles/123123/comments`).expect(404);
      expect(msg).toBe("Article not found");
    });
    test("Returns 400 when the article_id is not a number", async () => {
      const {
        body: {msg},
      } = await request(app)
        .post(`/api/articles/badrequest/comments`)
        .expect(400);
      expect(msg).toBe("Bad Request");
    });

    test("Returns 400 when the username does not exist", async () => {
      const newComment = {username: "nonexistentuser", body: "Great article!"};
      const {body} = await request(app)
        .post("/api/articles/2/comments")
        .send(newComment)
        .expect(404);
      expect(body.msg).toBe("User not found");
    });
  });
});

