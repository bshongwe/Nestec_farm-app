// # REDIS: Connect to Cluster
// # CAUTION: Redis server is connected to AWS Stack
const dotenv = require('dotenv');
const redis = require('redis');

dotenv.config(); // Load variables from .env file

// Extract Redis configuration from environment variables or use default values
const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;
const redisPassword = process.env.REDIS_PASSWORD; // Redis password

// Create Redis client with authentication
const client = redis.createClient({
  host: redisHost,
  port: redisPort,
  password: redisPassword,
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

const db = {
  // Load data from Redis
  loadData: function (filter) {
    // Return a Promise to mimic async behavior
    return new Promise((resolve, reject) => {
      client.lrange('clients', 0, -1, (err, data) => {
        if (err) {
          reject(err);
        } else {
          // Parse JSON data from Redis
          const clients = data.map(JSON.parse);
          // Apply filtering if provided
          if (filter) {
            const filteredClients = clients.filter(client => {
              return (!filter.Name || client.Name.includes(filter.Name)) &&
                (filter.Age === undefined || client.Age === filter.Age) &&
                (!filter.Address || client.Address.includes(filter.Address)) &&
                (!filter.Country || client.Country === filter.Country) &&
                (filter.Married === undefined || client.Married === filter.Married);
            });
            resolve(filteredClients);
          } else {
            resolve(clients);
          }
        }
      });
    });
  },

  // Insert item into Redis
  insertItem: function (insertingClient) {
    // Add new client to the list
    client.rpush('clients', JSON.stringify(insertingClient));
  },

  // Update item in Redis
  updateItem: function (updatingClient) {
    // Not implemented for this example
    // You can update data in Redis based on your application's requirements
  },

  // Delete item from Redis
  deleteItem: function (deletingClient) {
    // Remove client from the list
    client.lrem('clients', 0, JSON.stringify(deletingClient));
  }
};

module.exports = db;
