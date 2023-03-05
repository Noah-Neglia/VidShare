const UserController = require("../controllers/user.controller");
const { authenticate } = require('../config/jwt.config');



module.exports = app => {
  app.get("/api/user/logout", authenticate, UserController.logout);
  app.get("/api/users/", authenticate, UserController.findAllUsers);
  app.get("/api/current/user", authenticate, UserController.getUser);
  app.get("/api/user/:id", authenticate, UserController.findOneSingleUser);
  app.post("/api/user/register",  UserController.register);
  app.post("/api/user/login", UserController.login);
  app.put("/api/user/update/:id", authenticate, UserController.updateExistingUser);
  app.delete("/api/user/delete/:id", authenticate, UserController.deleteAnExistingUser);
  
};