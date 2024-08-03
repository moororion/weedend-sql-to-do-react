CREATE TABLE "tasks"(
"id" serial primary key,
"number" integer,
"task" varchar(120) not null,
"completed" boolean,
"date completed" date
);

INSERT INTO "tasks"
	("number", "task", "completed", "date completed")
VALUES
(1, 'Do homework.', true, '02/13/2024'),
(2, 'Do the dishes.', false, '02/13/2024'),
(3, 'Clean the bathroom.', false, '02/13/2024'),
(4, 'Finish eating ice-cream.', true, '02/14/2024'),
(5, 'Practice Corridos.', true, '02/15/2024');
SELECT * FROM "tasks";

