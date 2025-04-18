const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, unique: true, trim: true },
        imageUrl: { type: String, required: true },
        fullName: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        isSuperAdmin: { type: Boolean, default: false, required: function () { return this.isAdmin } },
        isBanned: { type: Boolean, default: false, required: true },
        // isActive: { type: Boolean, default: true, required: true },
        watchLater: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
        // role: {
        //     type: String,
        //     default: 0,
        //     enum: [0, 1, 2],
        //     default: 'user'
        // }
    },
    { timestamps: true }
)

const User = mongoose.model('User', userSchema)
module.exports = User