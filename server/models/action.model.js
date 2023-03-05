const mongoose = require("mongoose");

const ActionSchema = new mongoose.Schema({
    
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    commentOrLike : {
        type : String,
    },

    friend : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

}, {timestamps: true});

const Action = mongoose.model("Action", ActionSchema);

module.exports = Action;

