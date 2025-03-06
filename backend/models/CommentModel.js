const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema(
    {
        articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article", required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true }
    },
    { timestamps: true }
)

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment