const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');
const tasksTest = [
    { id: 1, number: 1, task: 'Do homework.', completed: true, dateCompleted: '2024-02-13' },
    { id: 2, number: 2, task: 'Do the dishes.', completed: false, dateCompleted: '2024-02-13' },
    { id: 3, number: 3, task: 'Clean the bathroom.', completed: false, dateCompleted: '2024-02-13' },
    { id: 4, number: 4, task: 'Finish eating ice-cream.', completed: true, dateCompleted: '2024-02-14' },
    { id: 5, number: 5, task: 'Practice Corridos.', completed: true, dateCompleted: '2024-02-15' },
  ];
// GET
router.get('/tasks', (req, res) => {
  console.log('GET /tasks hit');
  res.json(tasksTest);
});

// POST

// PUT

// DELETE

module.exports = router;
