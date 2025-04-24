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
      <form
        onSubmit={handleSubmit}
        className="mb-8 flex flex-col gap-8 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg"
      >
        <div className="flex flex-col gap-4">
          <label htmlFor="taskName" className="text-lg font-semibold text-gray-800">
            Idea Name
          </label>
          <input
            id="taskName"
            type="text"
            placeholder="Enter task name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="description" className="text-lg font-semibold text-gray-800">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
            rows="5"
          />
        </div>
        <button
          type="submit"
          className="button bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition text-lg font-medium"
        >
          Add Task
        </button>
      </form>
    );
  }
  
  export default TaskForm;