// import mongoose from 'mongoose';

// import { connectToMongoose } from './internals/connect';
// import { runAssertions } from './internals/assertions';

// (async function () {
//   try {
//     await connectToMongoose();

//     let books; // find() result should be assigned to this property
//     let Book; // Book model should be assigned to this property

//     // Add all of your code below

//     const bookSchema = new mongoose.Schema( {
//       author:{
//         type:String
//       },
//       country:{
//         type: String
//       },
//       language:{
//         type:String
//       },
//       pages:{
//         type:Number
//       },
//       title:{
//         type:String
//       },
//       year:{
//         type:String
//       },
//       amount:{
//         type:Number
//       },
//       unitPrice:{
//         type:Number
//       },
//     })

//     bookSchema.virtual('totalStoreValue')
//       .get(function() {
//         return this.unitPrice*this.amount
//       })
//argument val przyjmuje wartość pola do ktorego dostajemy się getterem
//     bookSchema.virtual('bookDetails')
//       .get(function() {
//         return `${this.author} - ${this.title}`
//       })
//       .set(function(val) {
//         let result = val.split('-');
//         this.author = result[0].trim();
//         this.title = result[1].trim();
//       })

//     Book = mongoose.model('Book',bookSchema);
//     books = await Book.find()
//       .where('amount').gte(40)
//       .exec()

//     const newBook = new Book({
//       year:2030
//     })

//     newBook.bookDetails = "Jan Kowalski - someTitleblabla"
//     await newBook.save();

//     await runAssertions(Book, books);
//   } catch (err) {
//     console.log('Error when running the task: ', err);
//   }
// })();

import mongoose from 'mongoose';

import { connectToMongoose } from './internals/connect';
import { runAssertions } from './internals/assertions';

(async function () {
  try {
    await connectToMongoose();

    let books; // find() result should be assigned to this property
    let Book; // Book model should be assigned to this property

    // Add all of your code below

    //first we do schema:
    const booksSchema = new mongoose.Schema({
      author: {
        type:String,
        required:true
      },
      country: {
        type:String,
        required:true
      },
      language: {
        type:String,
        required:true
      },
      pages: {
        type:Number,
        required:true
      },
      title: {
        type:String,
        required:true
      },
      year: {
        type:Number,
        required:true
      },
      amount: {
        type:Number,
        required:true
      },
      price: {
        type:Number,
        required:true
      },
    })

    //second we do virtual properties(before create model):
    booksSchema.virtual('totalStoreValue')
      .get(function (){
        return this.amount*this.price
      });

    //bookDetails odwołuje się do nazwy pola ktorego jeszcze nie utworzylismy:
    booksSchema.virtual('bookDetails')
      .get(function (){
        return `${this.author} - ${this.title}`
      })
      //val odwołuje się do tego co dalismy po znaku '=' przy ustawianiu setera:
      .set(function(val){
        const dataFromGetter = val.split('-');
        this.author=dataFromGetter[0].trim()
        this.title=dataFromGetter[1].trim()
      })

    //Third we make model:
    Book = new mongoose.model('Book', booksSchema)

    //Forth we request DB:
    books = await Book.find()
      .where('amount').gte(40).exec()

    const newBook = new Book({
      "author": "Gabriel Garc\u00eda M\u00e1rquez",
      "country": "Colombia",
      "language": "Spanish",
      "pages": 417,
      "title": "One Hundred Years of Solitude",
      "year": 1967,
      "amount": 20,
      "price": 42.5
  })
  //odwołujemy się do nazwy pola które również mamy w virtual: ("bookDetails" pojawi sie jako kolejna properta w newBook)
  newBook.bookDetails = 'Gabriel Garc\u00eda M\u00e1rquez - One Hundred Years of Solitude'
  await newBook.save();
  console.log(newBook.toObject({ virtuals: true}));
  
    await runAssertions(Book, books);
  } catch (err) {
    console.log('Error when running the task: ', err);
  }
})();
