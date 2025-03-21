const User = require("../models/UserModel")
const UserService = require('../services/UserService')

const addWatchLater = async (req, res) => {
    try {
        const { userId, articleId } = req.body

        if (!userId || !articleId) {
            return res.status(400).json({
                status: "ERR",
                message: "userId and articleId are required"
            })
        }

        const response = await UserService.addWatchLater(userId, articleId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            status: "ERR",
            message: error.message || "Server error"
        })
    }
}

const removeWatchLater = async (req, res) => {
    try {
        const { userId, articleId } = req.body

        if (!userId || !articleId) {
            return res.status(400).json({
                status: "ERR",
                message: "userId and articleId are required"
            })
        }

        const response = await UserService.removeWatchLater(userId, articleId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            status: "ERR",
            message: error.message || "Server error"
        })
    }
}

const getWatchLater = async (req, res) => {
    try {
        const userId = req.params.id

        if (!userId) {
            return res.status(400).json({
                status: "ERR",
                message: "userId is required"
            })
        }

        const response = await UserService.getWatchLater(userId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            status: "ERR",
            message: error.message || "Server error"
        })
    }
}

const loginUser = async (req, res) => {
    const { userId, imageUrl, fullName, isAdmin } = req.body

    if (!userId && !imageUrl && !fullName && !isAdmin) {
        return res.status(400).json({ message: "The input is require" });
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

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body

        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userID is required'
            })
        }
        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    addWatchLater,
    removeWatchLater,
    getWatchLater,
    loginUser,
    getDetailsUser,
    updateUser,
    getAllUser
}
