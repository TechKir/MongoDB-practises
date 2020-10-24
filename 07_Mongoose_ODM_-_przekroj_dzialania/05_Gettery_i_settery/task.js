import mongoose from 'mongoose';

import { runAssertions } from './internals/assertions';
const roundToTwoDecimals = (val) => Math.round(val * 100) / 100;

(async function () {
  try {
    let stockTransactionSchema;

    // Put your schema here
    stockTransactionSchema = new mongoose.Schema({
      price: {
        type: Number,
        required:true,
        get: (val) => roundToTwoDecimals(val),
        set: (val) => roundToTwoDecimals(val),
      },
      amount: {
        type: Number,
        required:true
      },
      symbol: {
        type: String,
        required:true
      },
      industry: {
        type: String,
        required:true
      },
    })
    await runAssertions(stockTransactionSchema);
  } catch (err) {
    console.log('Error when running the task: ', err);
  }
})();


