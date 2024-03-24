const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// #1. Serve index.html from <root>, </public>, </public/ai-models>
app.use(express.static(path.join(__dirname, '/')));
app.use(express.static(path.join(__dirname, 'public', 'ai-models')));

// #2. Define routes for specfic HTML files
app.get('index.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'index.html'));
});

// Serve index.html as </root>
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
