import MongoClient from 'mongodb';
const data = [
  {
    Name: 'Asparagus',
    Calories: 24,
    CookingTime: 200,
    Tags: {
      Tag: 'Vegetables'
    },
    FlavorValues: {
      SOUR: 3,
      SALT: 0,
      ACID: 0,
      SWEET: 0,
      FAT: 0,
      UMAMI: 0
    },
    Portions: {
      SMALL: 10,
      MEDIUM: 50,
      LARGE: 200
    }
  },
  {
    Name: 'Avocado',
    Calories: 200,
    CookingTime: 0,
    Tags: {
      Tag: 'Fruit'
    },
    FlavorValues: {
      SOUR: 0,
      SALT: 0,
      ACID: 0,
      SWEET: 3,
      FAT: 5,
      UMAMI: 0
    },
    Portions: {
      SMALL: 10,
      MEDIUM: 50,
      LARGE: 200
    }
  },
  {
    Name: 'Bacon',
    Calories: 500,
    CookingTime: 300,
    Tags: {
      Tag: 'Meat'
    },
    FlavorValues: {
      SOUR: 0,
      SALT: 4,
      ACID: 0,
      SWEET: 0,
      FAT: 8,
      UMAMI: 0
    },
    Portions: {
      SMALL: 15,
      MEDIUM: 60,
      LARGE: 150
    }
  },
  {
    Name: 'Banana',
    Calories: 80,
    CookingTime: 0,
    Tags: {
      Tag: 'Fruit'
    },
    FlavorValues: {
      SOUR: 0,
      SALT: 0,
      ACID: 2,
      SWEET: 4,
      FAT: 0,
      UMAMI: 0
    },
    Portions: {
      SMALL: 10,
      MEDIUM: 50,
      LARGE: 200
    }
  },
  {
    Name: 'Basil',
    Calories: 22,
    CookingTime: 0,
    Tags: {
      Tag: 'Spice'
    },
    FlavorValues: {
      SOUR: 10,
      SALT: 0,
      ACID: 0,
      SWEET: 0,
      FAT: 0,
      UMAMI: 0
    },
    Portions: {
      SMALL: 5,
      MEDIUM: 10,
      LARGE: 50
    },
  }
];
// Connection url
const url = 'mongodb://localhost:27017';

// Database name
const dbName = 'exercises';

// Collection Name
const collectionName = 'ingredients';

(async function () {
  try {
    // Connect using MongoClient
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log('Successfully connected to local MongoDB instance.');

    // Get DB instance
    const db = client.db(dbName);

    // Try to drop old collection, if existing
    try {
      await db.dropCollection(collectionName);
      console.log(`Dropped old ${ collectionName } collection`);
    } catch (err) {
      console.log('Collection does not exist yet, proceeding further');
    }

    // Add all the entries
    await db.createCollection(collectionName);
    console.log(`Created new ${ collectionName } collection`);

    await db.collection(collectionName).insertMany(data);
    console.log(`Inserted ${ collectionName } data into the collection`);

    await client.close();

    return process.exit(0);
  } catch (err) {
    console.log('Something went wrong!', err);
    return process.exit(1);
  }
})();