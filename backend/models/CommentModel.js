const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema(
    {
        articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article", required: true },
        // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        userId: { type: String, required: true },
        pending: { type: Boolean, default: true, required: true },
        content: { type: String, required: true },
        parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
        replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
    },
    { timestamps: true }
)

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment