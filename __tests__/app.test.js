const endpointsJson = require("../endpoints.json");
/* Set up your test imports here */

/* Set up your beforeEach & afterAll functions here */

xdescribe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});