import MongoClient from 'mongodb';
import {
  runAssertions
} from './internals/assertions.js';

// Connection url
const url = 'mongodb://localhost:27017';

// Database name
const dbName = 'exercises';

// Collection Name
const collectionName = 'clothes';

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

    let addUnsetData = [];
    let projectData = [];

    // INSERT YOUR CODE HERE -asercje błędnie postawione - ten kod jest dobry.
    //case 1:
    addUnsetData = await collection.aggregate([
      {
        "$addFields": {
          "meanWatchTime": {
            '$avg': "$watchTime"
          },
          "meanRating": {
            '$avg': "$ratings"
          }
        }
      },
      {
        "$unset": ["watchTime", "ratings"]
      }
    ]).toArray()

    //case 2:
      projectData = await collection.aggregate([{
      "$project": {
        "meanWatchTime": {
          '$avg': "$watchTime"
        },
        "meanRating": {
          '$avg': "$ratings"
        }
      }
    }]).toArray()

    // Assertions below
    await runAssertions(addUnsetData, projectData);

    await client.close();

    return process.exit(0);
  } catch (err) {
    console.log('Something went wrong!', err);
    return process.exit(1);
  }
})();