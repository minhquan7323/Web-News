const User = require("../models/User")

// Thêm bài viết vào danh sách yêu thích
const addLike = async (req, res) => {
    try {
        const { userId, articleId } = req.body // Lấy dữ liệu từ request

        const user = await User.findOneAndUpdate(
            { clerkId: userId }, // Tìm user theo Clerk ID
            { $addToSet: { likedArticles: articleId } }, // Chỉ thêm nếu chưa có
            { new: true }
        )

        if (!user) {
            return res.status(404).json({ status: "ERR", message: "User not found" })
        }

        return res.status(200).json({ status: "OK", message: "Added to favorites", user })
    } catch (error) {
        return res.status(500).json({ status: "ERR", message: "Server error", error })
    }
}

// Xóa bài viết khỏi danh sách yêu thích
const removeLike = async (req, res) => {
    try {
        const { userId, articleId } = req.body

        const user = await User.findOneAndUpdate(
            { clerkId: userId },
            { $pull: { likedArticles: articleId } }, // Gỡ bỏ article khỏi danh sách
            { new: true }
        )

        if (!user) {
            return res.status(404).json({ status: "ERR", message: "User not found" })
        }

        return res.status(200).json({ status: "OK", message: "Removed from favorites", user })
    } catch (error) {
        return res.status(500).json({ status: "ERR", message: "Server error", error })
    }
}

module.exports = { addLike, removeLike }
