const express = require('express');
const cors = require('cors');
const knex = require('knex')(require('./knexfile').development);

const app = express();
app.use(cors());
app.use(express.json());

// Initialize database
async function initDb() {
  await knex.schema.createTableIfNotExists('tasks', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description');
  });
}
initDb();

// READ: Get all tasks
app.get('/api/tasks', async (req, res) => {
  const tasks = await knex('tasks').select('*');
  res.json(tasks);
});

// CREATE: Add a task
app.post('/api/tasks', async (req, res) => {
  const { name, description } = req.body;
  const [id] = await knex('tasks').insert({ name, description });
  res.json({ id, name, description });
});

// UPDATE: Edit a task
app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  await knex('tasks').where({ id }).update({ name, description });
  res.json({ id, name, description });
});

// DELETE: Remove a task
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await knex('tasks').where({ id }).del();
  res.json({ message: 'Task deleted' });
});

app.listen(5000, () => console.log('Server running on port 5000'));