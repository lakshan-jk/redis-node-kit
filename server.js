const express = require('express');
const Redis = require('ioredis');
const apiRoutes = require('./src/routes/api');

const app = express();
const port = 3000;


const originConnection = new Redis({
  host: '127.0.0.1',
  port: 6379,
  password: 'LK@12345!',
});

const replicaConnection = new Redis({
  host: '127.0.0.1',
  port: 6380,
  password: 'LK@12345!',
  readOnly: true,
});

app.use((req, res, next) => {
  req.originConnection = originConnection;
  req.replicaConnection = replicaConnection;
  next();
});

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
