import axios from 'axios';
import { useState, useEffect } from 'react';

function TaskCompletionForm() {
  const [task, setTask] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [date, setDate] = useState('');
  const [tasks, setTasks] = useState([]);

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
      dateCompleted: new Date(date)
    };

    console.log('Submitting task:', newTask);

    axios.post('/api/todo', newTask)
      .then((response) => {
        setTask('');
        setIsCompleted(false);
        setDate('');
        fetchTasks();
      })
      .catch((error) => {
        console.error('Error adding task:', error);
      });
  };


  const handleDelete = (taskId) => {
    axios.delete(`/api/todo/${taskId}`)
      .then((response) => {
        fetchTasks();
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
        <button type="submit">Submit</button>
      </form>

      <h2>Tasks List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.task} - {task.isCompleted ? 'Completed' : 'Not Completed'} - {new Date(task.date).toLocaleDateString()}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskCompletionForm;
