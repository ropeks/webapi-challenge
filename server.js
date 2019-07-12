const express = require("express");
const routes = require('./api/routes');
const server = express();

server.use(express.json());

server.use('/', routes);

server.get('/', (req, res) => {
  res.send('<h1>Server is up and running.</h1>');
});

module.exports = server;