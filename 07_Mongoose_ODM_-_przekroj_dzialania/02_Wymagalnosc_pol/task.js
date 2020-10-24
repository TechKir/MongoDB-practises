import mongoose from 'mongoose';

import { runAssertions } from './internals/assertions';

(async function () {
  try {
    let appSchema;

    // Put your schema here
    //this wskazuje na cały dokument
    appSchema = new mongoose.Schema({
      version:{
        type:String,
        required: function(){
          return this.shouldUpdate
        }
      },
      shouldUpdate: Boolean,
      size: Number,
      installationLocation: String,
      lastChecked: {
        type: Number,
        required: function (){
          return this.shouldUpdate
        }
      }
    })
    await runAssertions(appSchema);
  } catch (err) {
    console.log('Error when running the task: ', err);
  }
})();
