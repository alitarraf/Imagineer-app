import { useState } from 'react';
  import axios from 'axios';

  function TaskList({ tasks, fetchTasks }) {
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const handleEdit = (task) => {
      setEditingId(task.id);
      setEditName(task.name);
      setEditDescription(task.description);
    };

    const handleUpdate = async (id) => {
      try {
        await axios.put(`http://localhost:5000/api/tasks/${id}`, {
          name: editName,
          description: editDescription,
        });
        setEditingId(null);
        fetchTasks();
      } catch (error) {
        console.error('Update error:', error);
      }
    };

    const handleDelete = async (id) => {
      if (window.confirm('Are you sure?')) {
        try {
          await axios.delete(`http://localhost:5000/api/tasks/${id}`);
          fetchTasks();
        } catch (error) {
          console.error('Delete error:', error);
        }
      }
    };

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">ID</th>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Description</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="border p-2">{task.id}</td>
                <td className="border p-2">
                  {editingId === task.id ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="p-1 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    task.name
                  )}
                </td>
                <td className="border p-2">
                  {editingId === task.id ? (
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="p-1 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                      rows="2"
                    />
                  ) : (
                    task.description
                  )}
                </td>
                <td className="border p-2 flex gap-2">
                  {editingId === task.id ? (
                    <button
                      onClick={() => handleUpdate(task.id)}
                      className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(task)}
                      className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  export default TaskList;