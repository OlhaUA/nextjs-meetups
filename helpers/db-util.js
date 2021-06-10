import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.gnjn0.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(connectionString, {
    useUnifiedTopology: true,
  });

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}

export async function getSelectedDocument(client, collection, selector) {
  const db = client.db();

  const document = await db.collection(collection).findOne(selector);

  return document;
}

export async function getAllId(client, collection, query, opts) {
  const db = client.db();

  const ids = await db.collection(collection).find(query, opts).toArray();

  return ids;
}
