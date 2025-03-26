const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        content: { type: String, required: true },
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
        author: { type: String, required: true },
        featured: { type: Boolean, required: true, default: false },
        source: [{ type: String, required: true }],
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }],
        read: { type: Number, default: 0 }
    },
    { timestamps: true }
)

const Article = mongoose.model('Article', articleSchema)
module.exports = Article