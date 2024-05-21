const express = require('express');
const jsPDF = require('jspdf');

const app = express();

// Enable CORS for all origins (replace with specific origins for production)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/convert', (req, res) => {
  const htmlContent = req.body.html;

  if (!htmlContent) {
    return res.status(400).send('Missing HTML content in request body');
  }

  try {
    const doc = new jsPDF();
    doc.text(htmlContent, 10, 10); // You can add further styling here with doc methods
    const pdfBuffer = doc.output('buffer');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=converted.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error during PDF conversion:', error);
    res.status(500).send('An error occurred during conversion.');
  }
});

app.listen(3000, () => console.log('Server listening on port 3000'));
