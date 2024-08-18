import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [date, setDate] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('/api/todo')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTask = {
      task: task,
      completed: isCompleted,
      dateCompleted: date,
    };

    axios.post('/api/todo', newTask)
      .then((response) => {
        setTasks([...tasks, response.data]);
        setTask('');
        setIsCompleted(false);
        setDate('');
      })
      .catch((error) => {
        console.error('Error adding task:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/todo/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  return (
    <div>
      <h1>TODO APP</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Task:
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter your task"
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
            />
            Is the task completed?
          </label>
        </div>
        <div>
          <label>
            Completed/Due Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.task} - {task.completed ? 'Yes' : 'No'} - {new Date(task.dateCompleted).toLocaleDateString()}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
