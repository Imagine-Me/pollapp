import { truncatePolls } from "../../controller/polls.controller";
import supertest from "supertest";

import app from "../../app";

const requestWithSuperTest = supertest(app);

const sleep = (delay: number) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(delay);
    }, delay)
  );

describe("test suit for question route", () => {
  let pollId: string;
  beforeAll(async () => {
    await sleep(3000);
    const pollResult = await requestWithSuperTest
      .post("/api/v1/polls/create")
      .send({
        title: "first poll",
      });
    pollId = pollResult.body.id;
  });

  afterAll(async () => {
    await truncatePolls();
  });

  test("should add new question", async () => {
    const result = await requestWithSuperTest
      .post("/api/v1/question/create")
      .send({
        pollId,
        question: "What is actually electricity?",
        options: [
          "A flow of water",
          "A flow of air",
          "A flow of electrons",
          "A flow of atoms",
        ],
        answer: 3,
      });
    expect(result.status).toEqual(200);
    expect(result.body).toMatchObject({ msg: "question created" });
  });
  test("should return all questions", async () => {
    const result = await requestWithSuperTest.get(`/api/v1/question/${pollId}`);
    expect(result.status).toEqual(200);
    expect(result.body.length).toBeGreaterThan(0);
  });
});
