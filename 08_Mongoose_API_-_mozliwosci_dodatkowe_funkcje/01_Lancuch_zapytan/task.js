// import mongoose from 'mongoose';

// import { connectToMongoose } from './internals/connect';
// import { runAssertions } from './internals/assertions';

// (async function () {
//   try {
//     await connectToMongoose();

//     let data;

//     // Add all of your code below

//     const ticketSchema = new mongoose.Schema({
//       eventName:{
//         type: String,
//         require:true
//       },
//       price:{
//         type: Number,
//         required:true
//       },
//       amount:{
//         type:Number,
//         required:true
//       },
//       date:{
//         type:Date,
//         required:true
//       }
//     });

//     const Ticket  = mongoose.model('Ticket',ticketSchema)

//     data = await Ticket.find()
//       .where('date').gte(new Date('2021-04-15')).lte(new Data('2021-08-20'))
//       .where('price').gt(140)
//       .exec();

//     await runAssertions(data);
//   } catch (err) {
//     console.log('Error when running the task: ', err);
//   }
// })();
////


import mongoose from 'mongoose';

import { connectToMongoose } from './internals/connect';
import { runAssertions } from './internals/assertions';

(async function () {
  try {
    await connectToMongoose();

    let data;
//schemat oraz model Mongoose 
    // Add all of your code below

    //First we do Schema:
    const ticketSchema = new mongoose.Schema({
      eventName: {
        type:String,
        required:true
      },
      price: {
        type:Number,
        required:true
      },
      amount: {
        type:Number,
        required:true
      },
      date: {
        type:Date,
        required:true
      }
    })

    //Second we do Model:
    const Ticket = new mongoose.model('Ticket',ticketSchema);

    //Last we request to the DB:
    data = await Ticket.find({})
      .where('date').gte(new Date('2021-04-15')).lte(new Date('2021-08-20'))
      .where('price').gte(140)
      .exec()

    console.log(data)

    await runAssertions(data);
  } catch (err) {
    console.log('Error when running the task: ', err);
  }
})();