const express = require('express');
   const cors = require('cors');
   const knex = require('knex')(require('./knexfile').development);

   const app = express();
  
   app.use((req, res, next) => {
    console.log(`Request from: ${req.headers.origin}, Method: ${req.method}`);
    next();
  });

   app.use(
    cors({
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type'],
      credentials: true,
    })
  );
  // Explicitly allow frontend origin   
   app.use(express.json());

   // Root route
   app.get('/', (req, res) => {
     res.json({ message: 'Welcome to the Task Manager API' });
   });

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
     console.log('GET /api/tasks called');
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