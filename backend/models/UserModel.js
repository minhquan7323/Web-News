const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, unique: true, trim: true },
        isAdmin: { type: Boolean, default: false, required: true },
        likedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }]
    },
    { timestamps: true }
)

const User = mongoose.model('User', userSchema)
module.exports = User