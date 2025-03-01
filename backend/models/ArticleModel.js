const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        content: { type: String, required: true },
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
        author: { type: String, required: true },
        source: [{ type: String }],
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
        read: { type: Number, required: true, default: 0 }
    },
    { timestamps: true }
)

const Article = mongoose.model('Article', articleSchema)
module.exports = Article