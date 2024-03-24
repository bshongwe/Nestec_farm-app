const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// #1. Serve index.html from <root>
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// #2. Serve static files from </'public'>
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
