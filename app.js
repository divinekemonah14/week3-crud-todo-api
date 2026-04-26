const express = require('express');
const app = express();
app.use(express.json());

let todos = [
  { id: 1, task: "Learn Backend", completed: false },
  { id: 2, task: "Submit BIU Assignment", completed: false }
];
let nextId = 3;

// CREATE - POST /todos - Validation: requires "task" field
app.post('/todos', (req, res) => {
  if (!req.body.task) {
    return res.status(400).json({ error: "Task field is required" });
  }
  const newTodo = {
    id: nextId++,
    task: req.body.task,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// READ ALL - GET /todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// READ ONE - GET /todos/:id - single read
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.json(todo);
});

// UPDATE - PUT /todos/:id
app.put('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  
  if (req.body.task) todo.task = req.body.task;
  if (req.body.completed !== undefined) todo.completed = req.body.completed;
  
  res.json(todo);
});

// DELETE - DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Todo not found" });
  
  todos.splice(index, 1);
  res.status(204).send();
});

// BONUS - GET /todos/active - filter completed
app.get('/todos/active', (req, res) => {
  const activeTodos = todos.filter(t => t.completed === false);
  res.json(activeTodos);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});