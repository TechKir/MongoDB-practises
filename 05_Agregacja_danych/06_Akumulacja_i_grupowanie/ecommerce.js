import MongoClient from 'mongodb';
import { runAssertions } from './internals/assertions.js';

// Connection url
const url = 'mongodb://localhost:27017';

// Database name
const dbName = 'exercises';

// Collection Name
const collectionName = 'eCommerce';

(async function () {
  try {
    // Connect using MongoClient
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log('Successfully connected to local MongoDB instance.');

    // Get DB instance
    const db = client.db(dbName);

    const collection = db.collection(collectionName);

    let data = [];
    // INSERT YOUR CODE HERE
    //pogrupowac po nazwach serwisow, oraz zsumowac wartosc wszytskich transakcji
    data = await collection.aggregate([
      {
        "$group": {
          "_id": '$service',
          "totalAmount": { "$sum": '$amount' }
        }
      },
      {
        "$project":{
          "_id":0,
          "service":"$_id",
          "totalAmount":"$totalAmount"
        }
      }
    ]).toArray();
    
    console.log(data)
    // Assertions below
    await runAssertions(data);

    await client.close();

    return process.exit(0);
  } catch (err) {
    console.log('Something went wrong!', err);
    return process.exit(1);
  }
})();

