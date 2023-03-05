const ActionController = require("../controllers/action.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
  app.get("/api/actions/", authenticate, ActionController.findAllActions);
  app.post("/api/action/new", authenticate, ActionController.createNewAction);
  app.delete("/api/action/delete/:id", authenticate, ActionController.deleteAction);
};