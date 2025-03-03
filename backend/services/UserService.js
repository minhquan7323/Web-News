const User = require('../models/UserModel')

const loginUser = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne({ userId });

            if (!user) {
                // Nếu user chưa tồn tại, tạo user mới
                user = new User({ userId });
                await user.save();
                return resolve({
                    status: 'OK',
                    message: 'New user created',
                    user
                });
            }

            // Nếu user đã tồn tại, trả về user hiện tại
            resolve({
                status: 'OK',
                message: 'User logged in successfully',
                user
            });

        } catch (e) {
            reject({
                status: 'ERR',
                message: 'Server error',
                error: e.message
            });
        }
    });
};


const getDetailsUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ userId: userId })

            if (user === null) {
                return resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: user
            })
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    loginUser,
    getDetailsUser
}