require("../../test-setup/setupTestDB");
const request = require("supertest");
const app = require("../../app");
describe("ENDPOINT: /api/users", () => {
  describe("GET: /api/users", () => {
    test("Responds with 200 OK status when users are fetched successfully", async () => {
      await request(app).get("/api/users").expect(200);
    });
    test("Returns an array of all users", async () => {
      const {
        body: {users},
      } = await request(app).get("/api/users").expect(200);
      expect(users.length).not.toBe(0);
      users.forEach((user) => {
        expect(user).toHaveProperty("username");
        expect(user).toHaveProperty("name");
        expect(user).toHaveProperty("avatar_url");
      });
    });
  });
});

describe("ENDPOINT: /api/users/:username", () => {
  describe("GET: /api/users/:username", () => {
    test("Responds with 200 OK when user is fetched successfully", async () => {
      await request(app).get("/api/users/lurker").expect(200);
    });
    test("Returns an object user when given an existent username", async () => {
      const {
        body: {user},
      } = await request(app).get("/api/users/icellusedkars").expect(200);
      expect(user.username).toBe("icellusedkars");
      expect(user.name).toBe("sam");
      expect(user.avatar_url).toBe(
        "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4"
      );
    });
  });
  describe("💥 Error handling tests", () => {
    test("Responds with 404 when the username is not found", async () => {
      const {
        body: {msg},
      } = await request(app).get(`/api/users/usernamedoesnotexists`).expect(404);
      expect(msg).toBe("User not found");
    });
    test("Responds with 400 when the username is not a string", async () => {
      const {
        body: {msg},
      } = await request(app).get(`/api/users/123`).expect(400);
      expect(msg).toBe("Bad Request");
    });
  });
});

