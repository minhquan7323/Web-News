const mongoose = require('mongoose')

const saveArticleSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
    },
    { timestamps: true }
)

const SaveArticle = mongoose.model('SaveArticle', saveArticleSchema)
module.exports = SaveArticle