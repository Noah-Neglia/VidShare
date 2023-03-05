const Like = require("../models/like.model");

module.exports.findAllLikes = (req, res) => {
  Like.find()
    .then(allLikes => res.json({ likes : allLikes }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneSingleLike = (req, res) => {
	Like.findOne({ _id: req.params.id })
		.then(oneLike => res.json({ like: oneLike }))
		.catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.createNewLike = (req, res) => {
  Like.create(req.body)
    .then(newLike => res.json({ like: newLike }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.updateLike = (req, res) => {
  Like.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(updatedLike => res.json({ like: updatedLike }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.unlike = (req, res) => {

  Like.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};