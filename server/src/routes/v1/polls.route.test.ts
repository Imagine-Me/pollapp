import supertest from "supertest";

import app from "../../app";
import { truncatePolls } from "../../controller/polls.controller";

const requestWithSuperTest = supertest(app);

const sleep = (delay: number) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(delay);
    }, delay)
  );

describe("Test suit for polls route", () => {
  afterAll(async () => {
    await truncatePolls();
  });
  beforeAll(async () => {
    await sleep(3000);
  });

  test("should add polls", async () => {
    const result = await requestWithSuperTest
      .post("/api/v1/polls/create")
      .send({
        title: "first poll",
      });
    expect(result.status).toEqual(200);
    expect(result.body).toMatchObject({ msg: "poll created" });
  });
  test("should get all polls and single poll", async () => {
    const result = await requestWithSuperTest.get("/api/v1/polls/");
    expect(result.status).toEqual(200);
    expect(result.body.length).toBeGreaterThan(0);
    const poll = result.body[0];
    expect(poll).toHaveProperty("title");
    expect(poll.title).toBe("first poll");
    const pollResult = await requestWithSuperTest.get(
      `/api/v1/polls/${poll.id}`
    );
    expect(pollResult.status).toEqual(200);
    expect(pollResult.body).toHaveProperty("title");
  });
});
