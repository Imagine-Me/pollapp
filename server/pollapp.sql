CREATE TABLE "users" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "email" varchar,
  "createdAt" timestamp,
  "updatedAt" timestamp
);

CREATE TABLE "polls" (
  "id" uuid PRIMARY KEY,
  "title" varchar,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "userId" int NOT NULL
);

CREATE TABLE "questions" (
  "id" SERIAL PRIMARY KEY,
  "question" varchar NOT NULL,
  "options" varchar[] NOT NULL,
  "answer" integer NOT NULL,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "pollId" int NOT NULL
);

CREATE TABLE "poll" (
  "id" uuid,
  "userId" uuid,
  "pollId" uuid,
  "createdAt" timestamp,
  "updatedAt" timestamp
);

ALTER TABLE "polls" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "questions" ADD FOREIGN KEY ("pollId") REFERENCES "polls" ("id");

ALTER TABLE "poll" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "poll" ADD FOREIGN KEY ("pollId") REFERENCES "polls" ("id");
