CREATE TABLE "tasks" (
"id" SERIAL PRIMARY KEY,
"task_name" VARCHAR(144) NOT NULL,
"completed" BOOLEAN DEFAULT 'false'
);

INSERT INTO "tasks" ("task_name") 
VALUES ('Mow the lawn');

INSERT INTO "tasks" ("task_name") 
VALUES ('Pick up kids');

INSERT INTO "tasks" ("task_name", "completed") 
VALUES ('Create a table', 'true');