const Action = require("../models/action.model");


module.exports.findAllActions = (req, res) => {
  Action.find().sort({createdAt: -1})
    .populate("user")
    .populate("friend")
    .then(allActions => res.json({ actions : allActions }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.createNewAction = (req, res) => {
 Action.create(req.body)
    .then(newAction => res.json({ action : newAction }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.deleteAction = (req, res) => {
  Action.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};