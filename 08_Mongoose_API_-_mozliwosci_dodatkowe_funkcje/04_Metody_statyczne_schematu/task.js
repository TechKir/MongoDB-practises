import mongoose from 'mongoose';

import { connectToMongoose } from './internals/connect';
import { runAssertions } from './internals/assertions';

(async function () {
  try {
    await connectToMongoose();

    let Book;

    // Add all of your code below
    const bookSchema = new mongoose.Schema({
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
      link: {
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
    });

    bookSchema.static('getBooksByPages', async function getBooksByPages(min, max){
      const query = this.find().where('pages')
      if(min){
        query.gte(min)
      }
      if(max){
        query.lte(max)
      }
      return await query.exec()
    })

    bookSchema.static('getRandomBookByYear', async function getRandomBookByYear(year){
      const allBooks = await this.find().where('year').eq(year).exec()

      if(allBooks.length>1){
        const randomIndex = Math.floor(Math.random() * allBooks.length);
        return allBooks[randomIndex]
      }

      return allBooks[0]
    })

    bookSchema.static('getBooksByLanguage',async function getBooksByLanguage(language){
      return await this.find().where('language').eq(language).exec()
    })

    Book = mongoose.model('Book',bookSchema);


    await runAssertions(Book);
  } catch (err) {
    console.log('Error when running the task: ', err);
  }
})();
