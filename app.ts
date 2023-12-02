// backend/server.ts

import express from 'express';

const app = express();
const port = 3001; // Choose a port for your Express server

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
