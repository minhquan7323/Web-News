const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },
        content: { type: String, required: true },
        imageUrl: { type: String, required: true },
        author: { type: String, required: true },
        source: [{ type: String }],
        categoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
    },
    { timestamps: true }
)

const Article = mongoose.model('Article', articleSchema)
module.exports = Article