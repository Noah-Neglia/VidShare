const PostController = require("../controllers/post.controller");
const multer = require('multer')
const { v4 : uuidv4} = require('uuid')
const path = require('path')
const { authenticate } = require('../config/jwt.config');


//Multer middleware to upload files to a folder in the application
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '/Users/noahneglia/Desktop/vidShare/client/src/content');
  },
  filename: function(req, file, cb){
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});


let upload = multer({ storage })


module.exports = app => {
  app.get("/api/posts/", authenticate,  PostController.findAllPosts);
  app.get("/api/post/:id", authenticate,PostController.findOneSinglePost);
  app.patch("/api/post/update/:id", authenticate, PostController.updatePost);
  app.post("/api/post/new", authenticate, upload.single('content'), PostController.createNewPost );
  app.delete("/api/post/delete/:id", authenticate, PostController.deletePost);
};