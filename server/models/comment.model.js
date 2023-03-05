const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
	comment :{
        type : String,
        required: [true, "Comment cannot be empty"]
    },

    commentedBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    actionId :{
        type : String
    }
    
}, {timestamps: true});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
