import supertest from "supertest";
import app from "../../../..";

describe("sample suite", () => {
  it("should return 200", async () => {
    const request = supertest(app);
    const response = await request.get("/api/v0/feeds");
    expect(response.status).toBe(200);
  });
});
