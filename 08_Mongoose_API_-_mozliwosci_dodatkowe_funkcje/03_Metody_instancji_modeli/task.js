// import mongoose from 'mongoose';

// import { connectToMongoose } from './internals/connect';
// import { runAssertions } from './internals/assertions';


// (async function () {
//   try {
//     await connectToMongoose();

//     let Order;

//     // Add all of your code below
//     const productSchema = new mongoose.Schema({
//       name: {
//         type:String,
//         required:true
//       },
//       brand: String,
//       available: Number,
//       lastOrderDate: Date,
//       unitPrice: Number,
//       supplierName: String,
//       expirationDate: Date,
//       categories: {
//         type:[String],
//         enum: [ 'coffee', 'food','accessories','equipment','premium']
//       }
//     });

//     const Product = mongoose.model('Product',productSchema)

//     const orderSchema = new mongoose.Schema({
//       date: Date,
//       location: String,
//       paidIn: {
//         type:[String],
//         enum:['cash','card']
//       },
//       staffId: mongoose.Schema.ObjectId, //to jest jak rozumiemprzekazanie jaki to ma byc typ a ma byc to typ zgodny z konstruktorem klasy ObjectID.
//       products: Array,
//       total: {
//         type:Number,
//         min:1
//       }
//     })

//     orderSchema.methods.getRelatedProducts= function(){
//       const prodIds = this.products.map(product=>product.productId);
//       return Product.find({
//         _id:{
//           '$in':prodIds
//         }
//       })
//     }

//     Order = mongoose.model('Order', orderSchema)

//     //czym sie różnie metoda 1: (ta dodaje do dokumnetu: "__v" : 1)
//     const orderToModyfy= await Order.findOne({
//       location: "Table 5"
//     }).exec()
 
//     orderToModyfy.location="table 5555555"
//     await orderToModyfy.save()

//     //od metody 2?:
//     const orderToModyfy = await Order.updateOne({location: "Table 5"},{location: "Table 6666666"}).exec()

//   } catch (err) {
//     console.log('Error when running the task: ', err);
//   }
// })();

//Moje rozwiązanie:
import mongoose from 'mongoose';

import { connectToMongoose } from './internals/connect';
import { runAssertions } from './internals/assertions';

(async function () {
  try {
    await connectToMongoose();

    let Order;

    // Add all of your code below

    //first we do schema product:
    const productSchema = new mongoose.Schema({
      name:String,
      brand:String,
      available:Number,
      lastOrderDate: Date,
      unitPrice: Number,
      supplierName: String,
      expirationDate: Date,
      categories:{
        type:[String],
        enum:['coffee','food','accessories','equipment','premium']
      }
    })

    const productModel = mongoose.model('Product',productSchema);

    //second we do schema for order:
    const orderSchema = new mongoose.Schema({
      date: Date,
      location: String,
      paidIn: {
        type:String,
        enum:['cash','card']
      },
      staffId: mongoose.Schema.ObjectId,
      products: Array,
      total: {
        type:Number,
        min:1
      }
    })
    //third we add method to schema:
    orderSchema.methods.getRelatedProducts = function () {
      const productIds = this.products.map( (product)=>{
        return product.productId
      })
      return productModel.find({_id:{$in:productIds}})
    };
    //Last we do model Order
    Order = mongoose.model('Order',orderSchema);

    await runAssertions(Order);
  } catch (err) {
    console.log('Error when running the task: ', err);
  }
})();
