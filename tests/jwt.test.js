const request = require('supertest');
const app = require('../src/app'); // Replace 'app' with the path to your Express.js application entry point

// Generate a random username
function generateUsername() {
  const adjectives = ["happy", "silly", "clever", "funny", "kind", "brave", "witty"];
  const nouns = ["cat", "dog", "bird", "lion", "tiger", "elephant", "monkey"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(Math.random() * 100);
  return `${adjective}_${noun}_${randomNumber}`;
}

// Generate a random password
function generatePassword() {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}

// Example usage
const username = generateUsername();
const password = generatePassword();

describe("Registration", () => {
  let token;

  test("POST /register should create a new user", (done) => {
    request(app)
      .post("/register")
      .send({
        username: `${username}`,
        email: `${username}@example.com`,
        password: `${password}`,
      })
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.message).toBe(`User ${username} created successfully.`);
        done();
      });
  });

  test("POST /register should return an error if username or email already exists", (done) => {
    request(app)
      .post("/register")
      .send({
        username: `${username}`,
        email: `${username}@example.com`,
        password: `${password}`,
      })
      .then((response) => {
        expect(response.status).toBe(409);
        expect(response.body.message).toBe("Username or email already exists");
        done();
      });
  });

  test("POST /login should return a JWT token", (done) => {
    request(app)
      .post("/login")
      .send({
        username: `${username}`,
        password: `${password}`
      })
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
        token = response.body.token; // Store the JWT token for further tests
        done();
      });
  });

  test("POST /login should return an error if username or password is incorrect", (done) => {
    request(app)
      .post("/login")
      .send({
        username: "nonexistentuser",
        password: "incorrectpassword",
      })
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("User not found");
        done();
      });
  });
});

describe("Authentication", () => {
  let token;

  test("POST /login should return a JWT token", (done) => {
    request(app)
      .post("/login")
      .send({
        username: `${username}`,
        password: `${password}`
      })
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
        token = response.body.token; // Store the JWT token for further tests
        done();
      });
  });

  test("GET /jwt/verify should return 'Success' when JWT is provided", (done) => {
    request(app)
      .get("/jwt/verify")
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Token is verified.");
        done();
      });
  });

  test("GET /jwt/verify should return 'No token provided' when no JWT is provided", (done) => {
    request(app)
      .get("/jwt/verify")
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body.error).toBe("No token provided");
        done();
      });
  });

  test("GET /jwt/verify should return 'Invalid token' when an invalid JWT is provided", (done) => {
    request(app)
      .get("/jwt/verify")
      .set("Authorization", "Bearer invalidtoken")
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Invalid token");
        done();
      });
  });
});

const bcrypt = require("bcrypt");
const saltRounds = 10;

const unhashedPassword = generatePassword();
let hashedPassword;
const incorrectPassword = "wrongpassword";

describe("Bcrypt Hash Password", () => {
  test("POST /bcrypt/hash", (done) => {
  
    request(app)
      .post("/bcrypt/hash")
      .send({
        password: unhashedPassword,
      })
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.message).toContain("Hash is successful.");
        hashedPassword = response.body.hash;
        done();
      });
  });
});

describe("Bcrypt Compare Password", () => {
  test("POST /bcrypt/compare > Correct Password", (done) => {
    

    request(app)
      .post("/bcrypt/compare")
      .send({
        password: unhashedPassword,
        hash: hashedPassword,
      })
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("Compare is successful.");
        done();
      });
  });

  test("POST /bcrypt/compare > Incorrect Password", (done) => {
    request(app)
      .post("/bcrypt/compare")
      .send({
        password: incorrectPassword,
        hash: hashedPassword,
      })
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body.message).toEqual("Wrong password");
        done();
      });
  });
});

for(let i = 0; i < 3; i++) {
  const userId = Math.floor(Math.random() * 1000);
  let token;

  describe(`JWT Generate Token ${i+1} and Verify`, () => {
      test("POST /jwt/generate", (done) => {
        request(app)
          .post("/jwt/generate")
          .send({ id: userId })
          .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body.token).toBeDefined();
            expect(response.body.message).toEqual("Token is generated.");
            token = response.body.token; // Store the JWT token for further tests
            done();
          });
      });

      test("GET /jwt/verify", (done) => {
        request(app)
          .get("/jwt/verify")
          .set("Authorization", `Bearer ${token}`)
          .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body.userId).toEqual(userId);
            expect(response.body.message).toEqual("Token is verified.");
            done();
          });
      });
  });
}