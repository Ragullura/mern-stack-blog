import Comment from  '../models/comment.model.js';
export const createComment =async (req,res,next) =>{
    //   console.log(req.body);
      try {
        const { content, postId, userId } = req.body;
        if (userId !== req.user.id){
            return next(
                errorHandler(403, 'You are not allowed to create this comment')
              );
        }
        //if  the user is logged in and trying to make a comment on his own post he should be able to do it
        const newComment = new Comment({
            content,
            postId,
            userId,
          });
          await newComment.save();
        //then response  with status code of 201 and send back the created commnet document
        res.status(200).json(newComment);
      } catch (error) {
        next(error);
      }

}

