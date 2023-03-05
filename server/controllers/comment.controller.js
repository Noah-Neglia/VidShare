const Comment = require("../models/comment.model");


module.exports.findAllComments = (req, res) => {
  Comment.find()
    .populate("commentedBy")
    .then(allComments => res.json({ comments : allComments }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneSingleComment = (req, res) => {
	Comment.findOne({ _id: req.params.id })
    .populate("commentedBy")
		.then(oneComment => res.json({ comment: oneComment }))
		.catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.createNewComment = (req, res) => {
 Comment.create(req.body)
    .then(newComment => res.json({ comment: newComment }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));

};

module.exports.updateComment = (req, res) => {
  Comment.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .populate("commentedBy")
    .then(updatedComment => res.json({ comment: updatedComment }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.deleteComment = (req, res) => {
  Comment.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};