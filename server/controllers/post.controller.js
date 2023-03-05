
const Post = require("../models/post.model");



module.exports.findAllPosts = (req, res) => {
  Post.find().sort({createdAt: -1})
    .populate("postedBy")
    .populate({
      path : "comments", options: { sort: {'created_at' : -1}},
      populate: {
        path: "commentedBy"
      }
    })
    .populate({
      path : "likes",
      populate: {
        path: "likedBy"
      }
    })
    .then(allPosts => res.json({ posts : allPosts }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneSinglePost = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .populate("postedBy")
        .populate({
          path : "comments",
          populate: {
            path: "commentedBy"
          }
        })
        .populate({
          path : "likes",
          populate: {
            path: "likedBy"
          }
        })
        .then(onePost => res.json({ post: onePost }))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};


module.exports.createNewPost =  (req, res) => {
  console.log(req.file.filename)

  const content = req.file.filename 
  const caption = req.body.caption
  const postedBy = req.body.postedBy

  const newPostData = {
    content,
    caption,
    postedBy
  }

  const newPost = new Post(newPostData)

  newPost.save()
          .then(() => res.json(newPost))
          .catch(err => res.status(400).json('Error:' + err));
};

module.exports.updatePost = (req, res) => {
 
  Post.findOneAndUpdate({ _id: req.params.id }, req.body , { new: true })
    .populate("postedBy")
    .populate({
      path : "comments",
      populate: {
        path: "commentedBy"
      }
    })
    .populate({
      path : "likes",
      populate: {
        path: "likedBy"
      }
    })
    .then(updatedPost =>res.json({ post: updatedPost}))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.deletePost = (req, res) => {
  Post.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};