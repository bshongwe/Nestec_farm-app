const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// #1. APP ROUTE SETUP
// #1.1 Serve index.html from <root>, </public>, </public/ai-models>
// app.use(express.static(path.join(__dirname, '/')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/ai-models', express.static(path.join(__dirname, 'public', 'ai-models')));
// app.use(express.static(path.join(__dirname, 'public', 'ai-models')));

// #1.2 Define routes for specfic HTML files
// #1.2.1 HOME: index.html
app.get('index.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'index.html'));
});

// #1.2.2 ABOUT: about.html
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// #1.2.3 FEATURES: features.html
app.get('/features', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'features.html'));
});

// #1.2.4 INVENTORY: inventory.html
app.get('/inventory', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'inventory.html'));
});

// #1.2.5 NEWS: news.html
app.get('/news', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'news.html'));
});

// #1.2.2 WEATHER: weather.html
app.get('/weather', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'weather.html'));
});

// # APP SERVER FRAMEWORK
// Serve index.html as </root>
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'index.html'));
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '/404.html'));
});

// Handle 500 errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).sendFile(path.join(__dirname, '/500.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Nestec server is online, running on port ${PORT}`);
});
