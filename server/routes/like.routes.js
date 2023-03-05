const LikeController = require("../controllers/like.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
  app.get("/api/likes/", authenticate, LikeController.findAllLikes);
  app.get("/api/like/:id", authenticate, LikeController.findOneSingleLike);
  app.put("/api/like/update/:id", authenticate, LikeController.updateLike);
  app.post("/api/like/new", authenticate, LikeController.createNewLike);
  app.delete("/api/like/delete/:id", authenticate, LikeController.unlike);
};