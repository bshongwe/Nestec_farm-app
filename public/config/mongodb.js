// #MONGOdb: Connect to Cluster
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // MongoDB URI
const dbName = 'yourDatabaseName'; // Change to your database name
const collectionName = 'clients'; // Change to your collection name

const db = {
  // Load data from MongoDB
  loadData: async function (filter) {
    // Connect to MongoDB
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    
    // Construct query based on filter
    const query = {};
    if (filter) {
      if (filter.Name) query.Name = { $regex: filter.Name, $options: 'i' };
      if (filter.Age !== undefined) query.Age = filter.Age;
      if (filter.Address) query.Address = { $regex: filter.Address, $options: 'i' };
      if (filter.Country) query.Country = filter.Country;
      if (filter.Married !== undefined) query.Married = filter.Married;
    }
    
    // Execute query and return result
    const result = await collection.find(query).toArray();
    await client.close();
    return result;
  },

  // Insert item into MongoDB
  insertItem: async function (insertingClient) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    await collection.insertOne(insertingClient);
    await client.close();
  },

  // Update item in MongoDB
  updateItem: async function (updatingClient) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    await collection.updateOne({ _id: updatingClient._id }, { $set: updatingClient });
    await client.close();
  },

  // Delete item from MongoDB
  deleteItem: async function (deletingClient) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    await collection.deleteOne({ _id: deletingClient._id });
    await client.close();
  }
};

module.exports = db;
