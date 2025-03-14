require("../../test-setup/setupTestDB");
const request = require("supertest");
const app = require("../../app");

describe("GET: /api/topics", () => {
  test("Responds with a 200 OK status when topics are fetched successfully", async () => {
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
describe("POST: /api/topics", () => {
  test("Responds with a 201 status when topic is created successfully", async () => {
    const testTopic = {slug: "topic name", description: "test description"};
    await request(app).post("/api/topics").send(testTopic).expect(201);
  });
  test("Returns newly created topic", async () => {
    const testNewTopic = {
      slug: "coding",
      description: "Learn more about JavaScript",
      img_url: "https://blog.pango.education/hubfs/Coding%20Blog%20Image.jpg",
    };
    const {
      body: {newTopic},
    } = await request(app).post("/api/topics").send(testNewTopic).expect(201);
    expect(newTopic.slug).toBe("coding");
    expect(newTopic.description).toBe("Learn more about JavaScript");
    expect(newTopic.img_url).toBe(
      "https://blog.pango.education/hubfs/Coding%20Blog%20Image.jpg"
    );
  });
  describe("", () => {
    test("Responds with 400 bad request if required fields are missing", async () => {
      const incompleteTopic = {
        slug: "coding",
      };
      const {
        body: {msg},
      } = await request(app)
        .post("/api/topics")
        .send(incompleteTopic)
        .expect(400);
      expect(msg).toBe("Bad Request: Missing required fields");
    });
    test("Returns 400 for invalid data types", async () => {
      const invalidTopic = {
        slug: 123,
        description: "Learn more about JavaScript",
        img_url: "https://blog.pango.education/hubfs/Coding%20Blog%20Image.jpg",
      };
      const {
        body: {msg},
      } = await request(app).post("/api/topics").send(invalidTopic).expect(400);
      expect(msg).toBe("Bad Request: Invalid data type");
    });
  });
});





