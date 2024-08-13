const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET all tasks
router.get('/', (req, res) => {
  console.log('GET /tasks hit');
  const queryText = 'SELECT * FROM "tasks";';

  pool.query(queryText)
    .then((dbResult) => {
      console.log('GET WORKED');
      res.send(dbResult.rows);
    })
    .catch((err) => {
      console.error('GET FAILED', err);
      res.sendStatus(500);
    });
});

// POST a new task
router.post('/', (req, res) => {
  console.log('POST /tasks hit');
  const { task, completed, dateCompleted } = req.body;

 

  const queryText = `
    INSERT INTO "tasks" (task, completed, "dateCompleted")
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const queryParams = [task, completed, dateCompleted];

  pool.query(queryText, queryParams)
    .then((dbResult) => {
      console.log('POST WORKED');
      res.status(201).send(dbResult.rows[0]);
    })
    .catch((err) => {
      console.error('POST FAILED', err);
      res.sendStatus(500);
    });
});

// PUT (Update) a task
router.put('/:id', (req, res) => {
  console.log('PUT /tasks/:id hit');
  const taskId = req.params.id;
  const { task, completed, dateCompleted } = req.body;

  if (!task || dateCompleted === undefined) {
    return res.status(400).send('Task and dateCompleted are required');
  }

  const queryText = `
    UPDATE "tasks"
    SET task = $1, completed = $2, "dateCompleted" = $3
    WHERE id = $4
    RETURNING *;
  `;
  const queryParams = [task, completed, dateCompleted, taskId];

  pool.query(queryText, queryParams)
    .then((dbResult) => {
      console.log('PUT WORKED');
      res.status(200).send(dbResult.rows[0]);
    })
    .catch((err) => {
      console.error('PUT FAILED', err);
      res.sendStatus(500);
    });
});

// DELETE a task
router.delete('/:id', (req, res) => {
  console.log('DELETE /tasks/:id hit');
  const taskId = req.params.id;
  const queryText = 'DELETE FROM "tasks" WHERE id = $1 RETURNING *;';

  pool.query(queryText, [taskId])
    .then((dbResult) => {
      console.log('DELETE WORKED');
      res.status(200).send(dbResult.rows[0]);
    })
    .catch((err) => {
      console.error('DELETE FAILED', err);
      res.sendStatus(500);
    });
});

module.exports = router;
