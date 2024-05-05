const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();
app.use(express.static('client'));

// Add middleware for http proxying 
const apiProxy = proxy('/api', { target: 'http://98.130.5.88:8080' });
app.use('/api', apiProxy);

// Render your site
const renderIndex = (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/index.html'));
}
app.get('/*', renderIndex);

app.listen(3000, () => {
  console.log('Listening on: http://localhost:3000');
});