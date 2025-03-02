const User = require("../models/UserModel")
const UserService = require('../services/UserService')

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

const loginUser = async (req, res) => {
    const { userId } = req.body

    if (!userId) {
        return res.status(400).json({ message: "Missing userId" });
    }

    try {
        const response = await UserService.loginUser(req.body)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userID is required'
            })
        }
        const response = await UserService.getDetailsUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    addLike,
    removeLike,
    loginUser,
    getDetailsUser
}
