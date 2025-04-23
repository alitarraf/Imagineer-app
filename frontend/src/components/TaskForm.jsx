import { useState } from 'react';
  import axios from 'axios';

  function TaskForm({ fetchTasks }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!name) return;
      try {
        await axios.post('http://localhost:5000/api/tasks', { name, description });
        setName('');
        setDescription('');
        fetchTasks();
      } catch (error) {
        console.error('Post error:', error);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          rows="4"
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
        >
          Add Task
        </button>
      </form>
    );
  }

  export default TaskForm;