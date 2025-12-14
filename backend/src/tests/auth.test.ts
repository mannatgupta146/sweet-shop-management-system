import request from "supertest";
import app from "../app";

describe("Auth API", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email: "test@example.com",
        password: "123456",
      });

    expect(res.status).toBe(201);
  });

  it("should login an existing user and return a token", async () => {
    // 👇 SETUP: register user first
    await request(app)
      .post("/api/auth/register")
      .send({
        email: "login@test.com",
        password: "123456",
      });

    // 👇 ACTION: login
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "login@test.com",
        password: "123456",
      });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
