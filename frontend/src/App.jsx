import { useState, useEffect } from 'react';
  import TaskList from './components/TaskList';
  import TaskForm from './components/TaskForm';

  function App() {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/tasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    useEffect(() => {
      fetchTasks();
    }, []);

    return (
      <div className="max-w-4xl mx-auto p-4 font-sans">
        <h1 className="text-3xl font-bold text-center mb-6">Task Manager</h1>
        <TaskForm fetchTasks={fetchTasks} />
        <TaskList tasks={tasks} fetchTasks={fetchTasks} />
      </div>
    );
  }

  export default App;