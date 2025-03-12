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

