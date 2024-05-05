// server.js

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Define your proxy route
app.use('/api', createProxyMiddleware({ target: 'http://98.130.5.88:8080', changeOrigin: true }));

// Define your other routes or middleware here

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});