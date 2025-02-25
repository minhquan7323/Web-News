const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, unique: true },
        isAdmin: { type: Boolean, default: false, require: true },
        likedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }]
    },
    { timestamps: true }
)

const User = mongoose.model('User', userSchema)
module.exports = User