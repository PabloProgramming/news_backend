require("../../test-setup/setupTestDB");
const request = require("supertest");
const app = require("../../app");

describe("ENDPOINT: /api/articles:article:id/comments", () => {
  describe("GET: /api/articles:article:id/comments", () => {
    test("Responds with a 200 OK status when an comments are fetched successfully", async () => {
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
      test("Responds with 404 when the article_id is not found", async () => {
        const {
          body: {msg},
        } = await request(app).get(`/api/articles/123123/comments`).expect(404);
        expect(msg).toBe("Not Found");
      });
      test("Responds with 400 when the article_id is not a number", async () => {
        const {
          body: {msg},
        } = await request(app)
          .get(`/api/articles/badrequest/comments`)
          .expect(400);
        expect(msg).toBe("Bad Request");
      });
      test("Responds with 400 when provided with wrong query sort_by values", async () => {
        const {
          body: {msg},
        } = await request(app)
          .get("/api/articles/3/comments?sort_by=invalid_column")
          .expect(400);
        expect(msg).toBe("Bad Request");
      });
      test("Responds with 400 when provided with wrong query order values", async () => {
        const {
          body: {msg},
        } = await request(app)
          .get("/api/articles/3/comments?sort_by=created_at&order=invalid")
          .expect(400);
        expect(msg).toBe("Bad Request");
      });
      test("Responds with 404 when there are not comments associated with provided article_id", async () => {
        const {
          body: {msg},
        } = await request(app).get("/api/articles/2/comments").expect(404);
        expect(msg).toBe("Not Found");
      });
    });
  });

  describe("POST: /api/articles/:article_id/comments", () => {
    test("Responds with a 201 status when comment is created successfully", async () => {
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
    test("Responds with 404 when the article_id is not found", async () => {
      const {
        body: {msg},
      } = await request(app).post(`/api/articles/123123/comments`).expect(404);
      expect(msg).toBe("Article not found");
    });
    test("Responds with 400 when the article_id is not a number", async () => {
      const {
        body: {msg},
      } = await request(app)
        .post(`/api/articles/badrequest/comments`)
        .expect(400);
      expect(msg).toBe("Bad Request");
    });

    test("Responds with 400 when the username does not exist", async () => {
      const newComment = {username: "nonexistentuser", body: "Great article!"};
      const {body} = await request(app)
        .post("/api/articles/2/comments")
        .send(newComment)
        .expect(404);
      expect(body.msg).toBe("User not found");
    });
  });
});

describe("ENDPOINT: /api/comments/:comment_id", () => {
  describe("DELETE: /api/articles:article:id/comments", () => {
    test("Responds with 204 status when a comment is deleted successfully", async () => {
      await request(app).delete("/api/comments/5").expect(204);
    });
    test("Successfully deletes a comment and updates the comments list for the article", async () => {
      await request(app).delete("/api/comments/10").expect(204);
      const {
        body: {comments},
      } = await request(app).get("/api/articles/3/comments");
      expect(comments.length).toBe(1);
    });
    describe("💥 Error handling tests", () => {
      test("Responds with 404 when the comment_id is not found", async () => {
        const {
          body: {msg},
        } = await request(app).delete(`/api/comments/999999`).expect(404);
        expect(msg).toBe("Comment not found");
      });
      test("Responds with 400 when the comment_id is not a number", async () => {
        const {
          body: {msg},
        } = await request(app).delete(`/api/comments/invalidId`).expect(400);
        expect(msg).toBe("Bad Request");
      });
    });
  });
  describe("PATCH: /api/comments/:comment_id", () => {
    test("Responds with 200 status when the comment is updated successfully", async () => {
      await request(app).patch("/api/comments/7").send({inc_votes: 3}).expect(200);
    });
    test("Returns the comment object with votes updated properly when a valid id is provided", async () => {
      const {
        body: {comment},
      } = await request(app).get("/api/comments/1").expect(200);
      expect(comment.votes).toBe(16);
      const {
        body: {updatedComment},
      } = await request(app)
        .patch("/api/comments/1")
        .send({inc_votes: 1})
        .expect(200);
      expect(updatedComment.votes).toBe(17);
    });
  });
   describe("💥 Error handling tests", () => {
     test("Responds with 404 when the id is not found", async () => {
       const {
         body: {msg},
       } = await request(app).patch(`/api/comments/123123`).expect(404);
       expect(msg).toBe("Comment not found");
     });
     test("Responds with 400 when the id is not a number", async () => {
       const {
         body: {msg},
       } = await request(app).patch(`/api/comments/badrequest`).expect(400);
       expect(msg).toBe("Bad Request");
     });
     test("Responds with 400 if inc_votes is not provided", async () => {
       const {
         body: {msg},
       } = await request(app).patch("/api/comments/2").send({}).expect(400);
       expect(msg).toBe("Bad Request");
     });
   });
});



