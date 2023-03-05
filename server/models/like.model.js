const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
    likedBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    actionId :{
        type : String
    }
}, {timestamps: true});

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;