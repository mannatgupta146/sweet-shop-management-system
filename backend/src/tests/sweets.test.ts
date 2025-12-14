import request from "supertest";
import app from "../app";

let token: string;

beforeAll(async () => {
  // Register user
  await request(app).post("/api/auth/register").send({
    email: "sweet@test.com",
    password: "123456",
  });

  // Login user
  const res = await request(app).post("/api/auth/login").send({
    email: "sweet@test.com",
    password: "123456",
  });

  token = res.body.token;
});

describe("Sweets API", () => {
  it("should add a new sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Gulab Jamun",
        category: "Indian",
        price: 20,
        quantity: 50,
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Gulab Jamun");
  });

  it("should get all sweets", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should search sweets by category", async () => {
    const res = await request(app)
      .get("/api/sweets/search?category=Indian")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update a sweet", async () => {
    const createRes = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Ladoo",
        category: "Indian",
        price: 10,
        quantity: 30,
      });

    const sweetId = createRes.body._id;

    const res = await request(app)
      .put(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        price: 15,
        quantity: 40,
      });

    expect(res.status).toBe(200);
    expect(res.body.price).toBe(15);
    expect(res.body.quantity).toBe(40);
  });

  it("should purchase a sweet (decrease quantity)", async () => {
    const createRes = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Rasgulla",
        category: "Indian",
        price: 15,
        quantity: 5,
      });

    const sweetId = createRes.body._id;

    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(4);
  });

  it("should restock a sweet (increase quantity)", async () => {
    const createRes = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Barfi",
        category: "Indian",
        price: 25,
        quantity: 10,
      });

    const sweetId = createRes.body._id;

    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 5 });

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(15);
  });
});
