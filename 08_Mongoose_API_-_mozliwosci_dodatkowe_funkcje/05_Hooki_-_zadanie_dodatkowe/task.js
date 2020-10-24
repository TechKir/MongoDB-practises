import mongoose from 'mongoose';

import populate from './internals/populate';
import { runAssertions } from './internals/assertions';

(async function () {
  try {
    await populate();

    let Comment;
    let Movie;

    // Add all of your code below

    const commentSchema = new mongoose.Schema({
      text:{
        type:String,
        required:true
      },
      author:{
        type:String,
        required:true
      },
      likes:{
        type:Number,
        required:true
      },
    });

    Comment = mongoose.model('Comment',commentSchema);

    const moviesSchema = new mongoose.Schema({
      movieID:{
        type:String,
        required:true
      },
      intRating:{
        type:String,
        required:true
      },
      title:{
        type:String,
        required:true
      },     
       timeStamp:{
        type:Number,
        required:true
      },
      rating:{
        type:Number,
        required:true
      },
      platform:{
        type:[String],
        enum:['Netflix', 'HBO Go', 'Prime'],
        required:true
      },
      date:{
        type:Number,
        required:true
      },
      comments:{
        type:[String],
        required:true
      }
    })

    moviesSchema.post('remove',async function(){
      const comments = this.comments || [];
      if (comments &&comments.length){
        return await Comment.remove({_id:{$in:comments}}).exec()
      }
    })
    Movie = mongoose.model('Movie',moviesSchema)

    await runAssertions(Comment, Movie);
  } catch (err) {
    console.log('Error when running the task: ', err);
  }
})();
