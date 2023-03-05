const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    caption : {
        type : String,
        required: [true, "Caption is required"]
    } ,

	content : {
        type : String,
        required: [true, "Content is required"],
    },
    
    postedBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    comments : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
       
    

    likes : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like"
    }]
}, {timestamps: true});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

