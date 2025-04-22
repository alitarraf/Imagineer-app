import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/api/tasks');
    const data = await res.json();
    setTasks(data);
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
