const model = require("../src/models/playerModel");
const pool = require("../src/services/db");

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

describe("Perform Read", () => {
  test("selectById should retrieve player data with the given id", (done) => {
    const mockData = {
      id: 1,
    };

    const mockCallback = (error, results) => {
      expect(error).toBeNull();
      expect(results).toEqual(expect.any(Object)); // Ensure the result is an array
      expect(model.selectById);
      // Additional assertions on the result can be added here
      done();
    };

    model.selectById(mockData, mockCallback);
  });

  test("selectAll should retrieve all player data", (done) => {
    const mockCallback = (error, results) => {
      expect(error).toBeNull();
      expect(results).toEqual(expect.any(Array)); // Ensure the result is an array
      expect(results[0].name).toEqual("Super Ash");
      expect(results[1].id).toEqual(3);
      expect(results[2].level).toEqual(1);
      // Additional assertions on the result can be added here
      done();
    };
    model.selectAll(mockCallback);
  });

  test("insertSingle should insert a new player into the database", (done) => {
    const mockData = {
      name: "Jessie",
      level: 1,
    };

    const mockCallback = (error, results) => {
      expect(error).toBeNull();
      expect(results).toEqual(expect.any(Object));
      expect(results.affectedRows).toEqual(1);
      // Additional assertions on the result can be added here
      done();
    };
    model.insertSingle(mockData, mockCallback);
  });

  test("updateById should update the player with the given id", (done) => {
    const mockData = {
      id: 1,
      name: "Super Ash",
      level: 100
    };

    const mockCallback = (error, results) => {
      expect(error).toBeNull();
      expect(results).toEqual(expect.any(Object));
      console.log(results);
      //expect(results.affectedRows).toEqual(1);
      done();
    };
    model.updateById(mockData, mockCallback);
  });

  test("deleteById should delete the player with the given id", (done) => {
    const mockData = {
      id: 3
    };

    const mockCallback = (error, results) => {
      expect(error).toBeNull();
      expect(results).toEqual(expect.any(Array)); // Ensure the result is an array
      console.log(results);
      //expect(results[0].affectedRows).toEqual(1);
      done();
    };
    model.deleteById(mockData, mockCallback);
  });
});

describe("Test Models", () => {
  test("selectAll should call pool.query with the correct arguments", () => {
    const mockCallback = () => {};

    const querySpy = jest.spyOn(pool, "query");

    model.selectAll(mockCallback);

    expect(querySpy).toHaveBeenCalledWith(
      expect.stringContaining("SELECT * FROM Player"),
      mockCallback
    );

    // Restore the original implementation of pool.query
    querySpy.mockRestore();
  });

  test("selectById should call pool.query with the correct arguments", () => {
    const mockData = { id: 1 };
    const mockCallback = () => {};

    const querySpy = jest.spyOn(pool, "query");

    model.selectById(mockData, mockCallback);

    expect(querySpy).toHaveBeenCalledWith(
      expect.stringContaining("SELECT * FROM Player") &&
        expect.stringContaining("WHERE id = ?"),
      [1],
      mockCallback
    );

    // Restore the original implementation of pool.query
    querySpy.mockRestore();
  });


  test("insertSingle should call pool.query with the correct arguments", () => {
    const mockData = { name: "Jessie",
    level: 1 };
    const mockCallback = () => {};

    const querySpy = jest.spyOn(pool, "query");

    model.insertSingle(mockData, mockCallback);

    expect(querySpy).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO Player") &&
        expect.stringContaining("VALUES (?, ?)"),
        expect.arrayContaining(["Jessie", 1]),
      mockCallback
    );

    // Restore the original implementation of pool.query
    querySpy.mockRestore();
  });


  test("updateById should call pool.query with the correct arguments", () => {
    const mockData = { name: "Super Brock", level:100, id: 2 };
    const mockCallback = () => {};

    const querySpy = jest.spyOn(pool, "query");

    model.updateById(mockData, mockCallback);

    expect(querySpy).toHaveBeenCalledWith(
      expect.stringContaining("UPDATE Player") &&
        expect.stringContaining("SET") &&
        expect.stringContaining("name = ?") && 
        expect.stringContaining("level = ?") &&
        expect.stringContaining("WHERE id = ?"),
        expect.arrayContaining(["Super Brock", 100, 2]),
      mockCallback
    );

    // Restore the original implementation of pool.query
    querySpy.mockRestore();
  });

  test("deleteById should call pool.query with the correct arguments", () => {
    const mockData = { id: 1 };
    const mockCallback = () => {};

    const querySpy = jest.spyOn(pool, "query");

    model.deleteById(mockData, mockCallback);

    expect(querySpy).toHaveBeenCalledWith(
      expect.stringContaining("DELETE FROM Player") &&
        expect.stringContaining("WHERE id = ?"),
        expect.arrayContaining([1]),
      mockCallback
    );

    // Restore the original implementation of pool.query
    querySpy.mockRestore();
  });
});


describe("BASIC EX GET Routes", () => {
  test("GET /user", (done) => {
    request(app)
      .get("/user")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(2);
        done();
      });
  });
});

describe("BASIC EX POST Routes", () => {
  test("POST /user > No Body", (done) => {
    const response = request(app)
      .post("/user")
      .send({})
      .then((response) => {
        expect(response.status).toBe(400);
        done();
      });
  });

  test("POST /user > With Body", (done) => {
    const response = request(app)
      .post("/user")
      .send({
        "username": "joanne.goh",
        "email": "joanne.goh@example.com",
        "password": "password123"
    })
      .then((response) => {
        expect(response.status).toBe(201);
        done();
      });
  });

  test("GET /user/:id > After POST", async () => {
    const response = await request(app).get("/user/3");
    expect(response.status).toBe(200);
    expect(response.body.username).toEqual("joanne.goh");
    expect(response.body.email).toEqual("joanne.goh@example.com");
    // Assert the expected response or perform further validations
  });

  test("GET /user > After POST > Check Length", async () => {
    const response = await request(app).get("/user");
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(3);
    // Assert the expected response or perform further validations
  });
});

describe("BASIC EX PUT Routes", () => {
  test("PUT /user/:id > User Not Exist", async () => {
    const response = await request(app).put("/user/6").send({
      "username": "jane.goh",
      "email": "jane.goh@example.com",
      "password": "newpassword123"
  });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "User not found",
    });
    // Assert the expected response or perform further validations
  });

  test("PUT /user/:id > User Exist", async () => {
    const response = await request(app).put("/user/3").send({
      "username": "jane.goh",
      "email": "jane.goh@example.com",
      "password": "newpassword123"
  });
    expect(response.status).toBe(204);
    // Assert the expected response or perform further validations
  });

  test("GET /user/:id > After PUT", async () => {
    const response = await request(app).get("/user/3");
    expect(response.status).toBe(200);
    expect(response.body.username).toEqual("jane.goh");
    expect(response.body.email).toEqual("jane.goh@example.com");
    // Assert the expected response or perform further validations
  });
});

describe("BASIC EX DELETE Routes", () => {
  test("DELETE /user/:id", async () => {
    const response = await request(app).delete("/user/3");
    expect(response.status).toBe(204);
    // Assert the expected response or perform further validations
  });

  test("GET /user/:id > After DELETE", async () => {
    const response = await request(app).get("/user/3");
    expect(response.status).toBe(404);
    // Assert the expected response or perform further validations
  });
});