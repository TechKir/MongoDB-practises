import MongoClient from 'mongodb';
import {
  runAssertions
} from './internals/assertions.js';

const ObjectID = MongoClient.ObjectID;

// Connection url
const url = 'mongodb://localhost:27017';

// Database name
const dbName = 'exercises';

// Collection Name
const collectionName = 'depthMeasurements2';

(async function () {
  try {
    // Connect using MongoClient
    const client = await MongoClient.connect(url, {
      useUnifiedTopology: true
    });
    console.log('Successfully connected to local MongoDB instance.');

    // Get DB instance
    const db = client.db(dbName);

    const collection = db.collection(collectionName);

    // INSERT YOUR CODE HERE
    await collection.updateMany({}, {
      "$pull": {
        "samples": {
          "$or": [{
            "depth": {
              $lte: 10
            }
          }, {
            "depth": {
              $gte: 100
            }
          }]
        }
      }
    })

    collection.updateOne({
      "_id": "123456"
    }, {
      "$push": {
        "samples": {
          "$each": [{
              _id: new ObjectID(),
              'depth': 34
            },
            {
              _id: new ObjectID(),
              'depth': 65
            }
          ]
        }
      }
    })

    collection.updateOne({
      "_id": "789101112"
    }, {
      "$push": {
        "samples": {
          "$each": [{
              _id: new ObjectID(),
              'depth': 97
            },
            {
              _id: new ObjectID(),
              'depth': 12
            },
            {
              _id: new ObjectID(),
              'depth': 45
            }
          ],
          "$position": 0,
          "$slice": 5
        }
      }
    })

    // Assertions below
    await runAssertions(collection);

    await client.close();

    return process.exit(0);
  } catch (err) {
    console.log('Something went wrong!', err);
    return process.exit(1);
  }
})();