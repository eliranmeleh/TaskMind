require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const tasksRouter = require('./routes/tasks.routes');

const app = express();

app.use(cors());        
app.use(express.json());  
app.use(morgan('dev'));   

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/api/tasks', tasksRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
