const { Router } = require('express');
const router = Router();


let tasks = [];           
let idCounter = 1;

// Create
router.post('/', (req, res) => {
  const { title, priority = 'medium', dueDate = null } = req.body || {};
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'title is required' });
  }
  const newTask = {
    id: idCounter++,
    title: title.trim(),
    status: 'todo',        // default
    priority,              // low | medium | high
    dueDate               
  };
  tasks.unshift(newTask);
  res.status(201).json(newTask);
});

// Read all
router.get('/', (_req, res) => {
  res.json(tasks);
});

// Read one
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const t = tasks.find(x => x.id === id);
  if (!t) return res.status(404).json({ error: 'not found' });
  res.json(t);
});

// Update (partial)
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = tasks.findIndex(x => x.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });

  const allowed = ['title', 'status', 'priority', 'dueDate'];
  const patch = {};
  for (const k of allowed) {
    if (k in req.body) patch[k] = req.body[k];
  }
  tasks[idx] = { ...tasks[idx], ...patch };
  res.json(tasks[idx]);
});

// Delete
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const before = tasks.length;
  tasks = tasks.filter(x => x.id !== id);
  if (tasks.length === before) return res.status(404).json({ error: 'not found' });
  res.json({ ok: true });
});

module.exports = router;
