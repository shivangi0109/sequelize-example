import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/tasks', { timeout: 5000 })
      .then(response => {
        console.log('Tasks from server:', response.data);
        setTasks(response.data);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);
  
  console.log('Rendered tasks:', tasks);

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
