import Post from '../models/post.model.js';
import { errorHandler } from '../utils/error.js';



export const create = async (req, res, next) => {

    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create a post'));
      }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Please provide all required fields'));
    }
    const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
      });

      try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
      } catch (error) {
        next(error);
      }


};

/*---------------- gets Post----------- */
export const getposts = async (req, res, next) => {
      try {
        //parseInt  is used to convert string into integer 
        const startIndex = parseInt(req.query.startIndex) || 0;
        // limit  is the number of items we want to skip in this case it will be 5 as per page
        const limit = parseInt(req.query.limit) || 9;
        //then sortDirection  will be either desc or asc based on what user has passed in query params
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        //then find post by  sorting them according to date and then skipping the starting index which is basically pageNumber * limit
        const posts = await Post.find({
          ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
          //searchterm  is used for search functionality
          ...(req.query.searchTerm && {
            $or: [
              //regex  can be used here to perform a regex match
              { title: { $regex: req.query.searchTerm, $options: 'i' } },
              { content: { $regex: req.query.searchTerm, $options: 'i' } },
            ],
          }),

        }).sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);

        //totalPost s is used to calculate total pages and then send back that data with our response
        const totalPosts = await Post.countDocuments();

        // new date () creates a new Date object from current time

        const now = new Date();

        const oneMonthAgo = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );

        const lastMonthPosts = await Post.countDocuments({
          createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json({
          posts,
          totalPosts,
          lastMonthPosts,
        });
        
      } catch (error) {
        next(error);
      }
};

/* Delete post */
export const deletepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this post'));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json('The post has been deleted');
  } catch (error) {
    next(error);
  }
};








