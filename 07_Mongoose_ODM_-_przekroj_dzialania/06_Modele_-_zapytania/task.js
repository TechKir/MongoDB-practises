import mongoose from 'mongoose';

import { connectToMongoose } from './internals/connect';
import { runAssertions } from './internals/assertions';

(async function () {
  try {
    await connectToMongoose();

    let data;

    // Add all of your code below

    const tripSchema = new mongoose.Schema({
      packageType: String,
      title:{
        type:String,
        required:true
      },
      blurb:String,
      description:{
        type:String,
        required:true
      },
      difficulty:{
        type:String,
        required:true
      },
      length:{
        type:Number,
        required:true
      },
      price:{
        type:Number,
        min:0
      },
      region: String
    })

    const Trip = mongoose.model('Trip',tripSchema)

    data = await Trip.find({length: {$gte:4}}).exec()
    await runAssertions(data);
  } catch (err) {
    console.log('Error when running the task: ', err);
  }
})();
