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
    // Return a Promise to mimic async behavior
    return new Promise((resolve, reject) => {
      // Load all clients from Redis
      client.lrange('clients', 0, -1, (err, data) => {
        if (err) {
          reject(err);
        } else {
          // Parse JSON data from Redis
          const clients = data.map(JSON.parse);
          // Find the index of the client to update
          const index = clients.findIndex(client => client._id === updatingClient._id);
          if (index !== -1) {
            // Update the client data
            clients[index] = updatingClient;
            // Overwrite the entire list in Redis
            client.del('clients', (err) => {
              if (err) {
                reject(err);
              } else {
                clients.forEach(client => {
                  client.rpush('clients', JSON.stringify(client));
                });
                resolve();
              }
            });
          } else {
            reject(new Error('Client not found'));
          }
        }
      });
    });
  },

  // Delete item from Redis
  deleteItem: function (deletingClient) {
    // Remove client from the list
    client.lrem('clients', 0, JSON.stringify(deletingClient));
  }
};

module.exports = db;
