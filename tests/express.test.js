const request = require("supertest");
const app = require("../src/app"); // Replace 'app' with the path to your Express.js application entry point
const fs = require("fs");

describe("Express.js GET Routes", () => {
  test("GET /player", (done) => {
    request(app)
      .get("/player")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(3);
        done();
      });
  });
});

describe("Express.js POST Routes", () => {
  test("POST /player > No Body", (done) => {
    const response = request(app)
      .post("/player")
      .send({})
      .then((response) => {
        expect(response.status).toBe(400);
        done();
      });
  });

  test("POST /player > With Body", (done) => {
    const response = request(app)
      .post("/player")
      .send({
        name: "Jessie",
        level: 1,
      })
      .then((response) => {
        expect(response.status).toBe(201);
        done();
      });
  });

  test("GET /player/:id > After POST", async () => {
    const response = await request(app).get("/player/4");
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual("Jessie");
    expect(response.body.level).toEqual(1);
    // Assert the expected response or perform further validations
  });

  test("GET /player > After POST > Check Length", async () => {
    const response = await request(app).get("/player");
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(4);
    // Assert the expected response or perform further validations
  });
});

describe("Express.js PUT Routes", () => {
  test("PUT /player/:id > Missing Data", async () => {
    const response = await request(app).put("/player/4").send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Error: name or level is undefined",
    });
    // Assert the expected response or perform further validations
  });

  test("PUT /player/:id > Player Not Exist", async () => {
    const response = await request(app).put("/player/6").send({
      name: "Super Jessie",
      level: 100,
    });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Player not found",
    });
    // Assert the expected response or perform further validations
  });

  test("PUT /player/:id > Player Exist", async () => {
    const response = await request(app).put("/player/1").send({
      name: "Super Ash",
      level: 100,
    });
    expect(response.status).toBe(204);
    // Assert the expected response or perform further validations
  });

  test("GET /player/:id > After PUT", async () => {
    const response = await request(app).get("/player/1");
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual("Super Ash");
    expect(response.body.level).toEqual(100);
    // Assert the expected response or perform further validations
  });
});

describe("Express.js DELETE Routes", () => {
  test("DELETE /player/:id", async () => {
    const response = await request(app).delete("/player/2");
    expect(response.status).toBe(204);
    // Assert the expected response or perform further validations
  });

  test("GET /player/:id > After DELETE", async () => {
    const response = await request(app).get("/player/2");
    expect(response.status).toBe(404);
    // Assert the expected response or perform further validations
  });
});

describe("Check package.json", () => {
  let packageJson;

  beforeAll(() => {
    // Read the package.json file and parse it as JSON
    const packageJsonContents = fs.readFileSync("package.json", "utf8");
    packageJson = JSON.parse(packageJsonContents);
  });

  it("should have a start script", () => {
    expect(packageJson).toHaveProperty("scripts.start");
  });

  it("should have a dev script", () => {
    expect(packageJson).toHaveProperty("scripts.dev");
  });

  it("should specify correct values for start and dev scripts", () => {
    const startScript = packageJson.scripts.start;
    const devScript = packageJson.scripts.dev;

    expect(startScript).toEqual("node index.js"); // Replace 'index.js' with your entry point
    expect(devScript).toEqual("nodemon index.js"); // Replace 'index.js' with your entry point
  });

  it("should have a express dependencies", () => {
    expect(packageJson).toHaveProperty("dependencies.express");
  });

  it("should have a nodemon dependencies", () => {
    expect(packageJson).toHaveProperty("dependencies.nodemon");
  });
});