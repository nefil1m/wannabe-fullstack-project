import { MongoClient } from 'mongodb'

let _mongoClientPromise;
const uri = process.env.MONGODB_URI

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

// I've run into this: https://www.mongodb.com/community/forums/t/isconnected-not-a-function-in-next-js-app/121429/2
// So I kinda used this: https://stackoverflow.com/a/55432645
// The thing is, that Mongo docs doesn't work today :<
// @ts-ignore
export const isMongoDBConnected = (client: MongoClient) => client.topology.isConnected();

if (process.env.NODE_ENV === 'development') {
  if (!_mongoClientPromise) {
    client = new MongoClient(uri as string)
    _mongoClientPromise = client.connect()
  }
  clientPromise = _mongoClientPromise
} else {
  client = new MongoClient(uri as string)
  clientPromise = client.connect()
}

export default clientPromise as Promise<MongoClient>
