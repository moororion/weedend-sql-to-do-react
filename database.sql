DROP TABLE IF EXISTS tasks;

CREATE TABLE "tasks" (
  "id" SERIAL PRIMARY KEY,
  "task" VARCHAR(255) NOT NULL,
  "completed" BOOLEAN NOT NULL,
  "dateCompleted" DATE NOT NULL
);




INSERT INTO "tasks" ("task", "completed", "dateCompleted")
VALUES
('Do homework.', true, '2024-02-13'),
('Do the dishes.', false, '2024-02-13'),
('Clean the bathroom.', false, '2024-02-13'),
('Finish eating ice-cream.', true, '2024-02-14'),
('Practice Corridos.', true, '2024-02-15');

SELECT * FROM "tasks";
