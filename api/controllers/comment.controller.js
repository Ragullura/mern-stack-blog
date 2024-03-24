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

};

/*-------- display the comment-------- */

export const getPostComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).sort({
            createdAt: -1,
          }); //search by the postId 
        
        /* for each comment we need to attach the username so that we can show who made the comment*/
        res.status(200).json(comments);
        
    } catch (error) {
        next(error)
    }

};

/* like  or dislike a comment */

export const likeComment =async(req,res,next)=>{
    try {
      const comment = await Comment.findById(req.params.commentId);
      if(!comment){
        return next(errorHandler(404, 'Comment not found'));
      }
      // indexOf  will return -1 if the item is not in the array , otherwise it will return the position of the element

      const userIndex = comment.likes.indexOf(req.user.id);
      if(userIndex ==-1){//userIndex ==-1 is  when the user has not liked this comment before
        comment.numberOfLikes+=1;
        comment.likes.push(req.user.id);

      }else{
        comment.numberOfLikes-=1;
        comment.likes.splice(userIndex ,1);
      }
      await comment.save();
      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
};

/*------------------------editComment------------------- */

export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, 'Comment not found'));
    }
    //if user is not an admin  and trying to update another users comment then throw error
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(403, 'You are not allowed to edit this comment')
      );
    }
    //update fields of the comment that have been modified by the user
    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
};

/* ----------------deleteComment------------------- */
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, 'Comment not found'));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(
        errorHandler(403, 'You are not allowed to delete this comment')
      );
    }
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json('Comment has been deleted');
    
  } catch (error) {
    next(error);
  }
}
