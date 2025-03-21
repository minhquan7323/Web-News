const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, unique: true, trim: true },
        imageUrl: { type: String, required: true },
        fullName: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        watchLater: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }]
    },
    { timestamps: true }
)

const User = mongoose.model('User', userSchema)
module.exports = User