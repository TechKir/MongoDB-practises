import MongoClient from 'mongodb';

// Connection url
const url = 'mongodb://localhost:27017';

// Database name
const dbName = 'exercises';

// Collection Name
const collectionName = 'footballers';

(async function () {
  try {
    // Connect using MongoClient
    const client = await MongoClient.connect(url, {useUnifiedTopology: true});
    console.log('Successfully connected to local MongoDB instance.');

    // Get DB instance
    const db = client.db(dbName);

    const collection = db.collection(collectionName);

    // HERE - modify this "find" code!

    const footballers = collection.find({
      "$nor" : [
        {"games":{"$gte":4}},
        {"inactive": true},
        {"redCards":{"$lt":2}}
      ]
    })

    // HERE - add your average calculating code here:
    //rozwiązanie 1:
    let avg = 0;
    let goals=0;
    const footballersCount = await footballers.count();

    await footballers.forEach( footballer => {
      goals+=footballer.goals
    });
    avg=goals/footballersCount

    //rozwiązanie 2:
    // let avg = 0;

    // while( await footballers.hasNext()){
    //   const doc = await footballers.next();
    //   avg+=doc.goals
    // }
    // avg /= await footballers.count();


    // Assertions below
    const footballersArr = await footballers.toArray();
    console.assert(footballersArr && footballersArr[0] && footballersArr[0].name === 'Port Varley',
        'Should find Port as the first non-performant footballer', footballersArr);
    console.assert(Math.round(avg * 100) / 100 === 2.67, 'Should have average goals of 2.67',
        Math.round(avg * 100) / 100);

    await client.close();

    return process.exit(0);
  } catch (err) {
    console.log('Something went wrong!', err);
    return process.exit(1);
  }
})();

