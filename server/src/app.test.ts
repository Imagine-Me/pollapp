import supertest from "supertest";

import app from "./app";

const requestWithSuperTest = supertest(app);

describe("test main route", () => {
  it("should return Hello world in main route", async () => {
    const result = await requestWithSuperTest.get("/");
    expect(result.status).toEqual(200);
    expect(result.text).toEqual("HELLO WORLD");
  });
});
