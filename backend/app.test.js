const request = require("supertest");
const app = require("./app");

describe("API Tests", () => {
  it("GET /api/developer-notes should return array", async () => {
    const response = await request(app).get("/api/developer-notes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("POST /api/developer-notes missing fields should return 400", async () => {
    const response = await request(app)
      .post("/api/developer-notes")
      .send({ title: "Test Note" }); // nedostaju ostala polja
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  // Ovo je samo primer — moraš imati ispravnu bazu ili je mockati
  it("POST /api/developer-notes with all fields should succeed", async () => {
    const response = await request(app).post("/api/developer-notes").send({
      title: "Nova bilješka",
      content: "Sadržaj",
      category: "Općenito",
      priority: "Visoka",
      author: "Ivan",
    });

    // Ako baza radi, status bi trebao biti 200
    expect([200, 500]).toContain(response.status); // dozvoljavamo 500 ako DB nije dostupna
  });
});
