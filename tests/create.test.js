const model = require("../src/models/playerModel");
const pool = require("../src/services/db");

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
      expect(results[0].name).toEqual("Ash");
      expect(results[1].id).toEqual(2);
      expect(results[2].level).toEqual(30);
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
