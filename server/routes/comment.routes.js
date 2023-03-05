const CommentController = require("../controllers/comment.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
  app.get("/api/comments/", authenticate, CommentController.findAllComments);
  app.get("/api/comment/:id", authenticate, CommentController.findOneSingleComment);
  app.put("/api/comment/update/:id", authenticate, CommentController.updateComment);
  app.post("/api/comment/new", authenticate, CommentController.createNewComment);
  app.delete("/api/comment/delete/:id", authenticate, CommentController.deleteComment);
};