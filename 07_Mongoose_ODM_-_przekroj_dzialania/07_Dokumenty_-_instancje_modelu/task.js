// import mongoose from 'mongoose';

// import { connectToMongoose } from './internals/connect';
// import { runAssertions } from './internals/assertions';

// (async function () {
//   try {
//     await connectToMongoose();

//     // Add all of your code below
//     let tomato
//     const ingredientSchema =  new mongoose.Schema({
//       Name: {
//         type:String,
//         required:true
//       },
//       Calories: {
//         type:Number,
//         required:true
//       },
//       CookingTime: {
//         type:Number,
//         required:true
//       },
//       Tags: [new mongoose.Schema({
//         type:String
//       })],
//       Portions: new mongoose.Schema({
//         SMALL: {
//           type: Number,
//           required: true,
//           min: 1
//         },
//         MEDIUM: {
//           type: Number,
//           required: true,
//           min: 1
//         },
//         LARGE: {
//           type: Number,
//           required: true,
//           min: 1
//         },
//       }),
//       // FlavorValues: {
//       //   type: new mongoose.Schema( {
//       //     SOUR: {
//       //       type:Number,
//       //       default:0
//       //     },
//       //     SALT: {
//       //       type:Number,
//       //       default:0
//       //     },
//       //     ACID: {
//       //       type:Number,
//       //       default:0
//       //     },
//       //     SWEET: {
//       //       type:Number,
//       //       default:0
//       //     },
//       //     FAT: {
//       //       type:Number,
//       //       default:0
//       //     },
//       //     UMAMI:{
//       //       type:Number,
//       //       default:0
//       //     }
//       //   })
//       // }
//       //wychodzi na to, ze jak zrobimy do naszych kluczy(np.UMAMI) osobno default to ta wartosc sie tak czy siak utworzy nawet jak nie podamy ją przy tworzaniu dokumentu. Natomiast powyzej jezeli podamy klucz bez wartosci to dopiero wtedy utworzy sie wartosc defaultowa ale jezeli nie podamy klucza przy tworzeniu dokumentu no to nic nam sie nie wygeneruje.
//       FlavorValues: {
//         type: new mongoose.Schema({
//           SOUR: Number,
//           SALT: Number,
//           ACID: Number,
//           SWEET: Number,
//           FAT: Number,
//           UMAMI: Number
//         }),
//         default: {
//           SOUR: 0,
//           SALT: 0,
//           ACID: 0,
//           SWEET: 0,
//           FAT: 0,
//           UMAMI: 0
//         }
//       }
//     })

//     const Ingredient = mongoose.model('Ingredient', ingredientSchema);

//     tomato = new Ingredient({
//       Name: 'Tomato',
//       Calories: 30,
//       CookingTime: 480,
//       Tags: {
//         Tag: 'Vegetables'
//       },
//       Portions: {
//         SMALL: 15,
//         MEDIUM: 75,
//         LARGE: 200
//       }
//     });

//     await tomato.save();

//     await runAssertions(tomato);
//   } catch (err) {
//     console.log('Error when running the task: ', err);
//     console.assert(!err, 'Should not trigger error handler!', err);
//   }
// })();

import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  firtsName: String,
  lastName: String
});

const User = mongoose.model('User', userSchema);

User.find({ name: 'John' }).exec((results) => console.log(results));
