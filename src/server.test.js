const request = require("supertest");
const app = require("./server");

describe("base", () => {
  test("should return Up", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
  });
});

describe("User", () => {
  let cookie = "";

  beforeEach(async () => {
    const loginRes = await request(app)
      .post("/login")
      .send({ role: "user" })
      .set("Accept", "application/json");

    expect(loginRes.status).toBe(200);

    cookie = loginRes.headers["set-cookie"];
  });

  test("Create /ts", async () => {
    const res = await request(app).post("/ts").set("Cookie", cookie);
    expect(res.status).toBe(200);
  });

  test("Read /ts", async () => {
    const res = await request(app).get("/ts").set("Cookie", cookie);
    expect(res.status).toBe(200);
  });

  test("Delete /ts", async () => {
    const res = await request(app).delete("/ts").set("Cookie", cookie);
    expect(res.status).toBe(200);
  });

  test("Create /ts/verify", async () => {
    const res = await request(app).post("/ts/verify").set("Cookie", cookie);
    expect(res.status).toBe(200);
  });

  test("Create /ts/approve", async () => {
    const res = await request(app).post("/ts/approve").set("Cookie", cookie);
    expect(res.status).toBe(403);
  });
});

describe("ts Approver", () => {
  let cookie = "";

  beforeEach(async () => {
    const loginRes = await request(app)
      .post("/login")
      .send({ role: "tsApprover" })
      .set("Accept", "application/json");

    expect(loginRes.status).toBe(200);

    cookie = loginRes.headers["set-cookie"];
  });

  test("Create /ts", async () => {
    const res = await request(app).post("/ts").set("Cookie", cookie);
    expect(res.status).toBe(403);
  });

  test("Read /ts", async () => {
    const res = await request(app).get("/ts").set("Cookie", cookie);
    expect(res.status).toBe(200);
  });

  test("Delete /ts", async () => {
    const res = await request(app).delete("/ts").set("Cookie", cookie);
    expect(res.status).toBe(200);
  });

  test("Create /ts/verify", async () => {
    const res = await request(app).post("/ts/verify").set("Cookie", cookie);
    expect(res.status).toBe(403);
  });

  test("Create /ts/approve", async () => {
    const res = await request(app).post("/ts/approve").set("Cookie", cookie);
    expect(res.status).toBe(200);
  });
});

describe("Admin", () => {
  let cookie = "";

  beforeEach(async () => {
    const loginRes = await request(app)
      .post("/login")
      .send({ role: "admin" })
      .set("Accept", "application/json");

    expect(loginRes.status).toBe(200);

    cookie = loginRes.headers["set-cookie"];
  });

  test("Create /ts", async () => {
    const res = await request(app).post("/ts").set("Cookie", cookie);
    expect(res.status).toBe(200);
  });

  test("Read /ts", async () => {
    const res = await request(app).get("/ts").set("Cookie", cookie);
    expect(res.status).toBe(200);
  });

  test("Delete /ts", async () => {
    const res = await request(app).delete("/ts").set("Cookie", cookie);
    expect(res.status).toBe(200);
  });

  test("Create /ts/verify", async () => {
    const res = await request(app).post("/ts/verify").set("Cookie", cookie);
    expect(res.status).toBe(403);
  });

  test("Create /ts/approve", async () => {
    const res = await request(app).post("/ts/approve").set("Cookie", cookie);
    expect(res.status).toBe(200);
  });
});
